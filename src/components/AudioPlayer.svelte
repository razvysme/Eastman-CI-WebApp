<script>
	import { audioData, audioData_Normal } from '../audioData.js';
	import { goto } from '$app/navigation';
	import TrackHeading from './TrackHeading.svelte';
	import ProgressBarTime from './ProgressBarTime.svelte';
	import Controls from './Controls.svelte';
	import PlayList from './PlayList.svelte';
	import {listenMatrix} from './../stores/trackIndexStore.js';
	import { browser } from '$app/environment';
	import { logSession } from '../stores/logStore.js';
	import { logUpdateSession } from '../stores/logStore.js';
	import { logCompleted } from '../stores/logStore.js';
	import {tactileUsers } from "../stores/userList.js"

	// Get Audio track
	export let  trackIndex = 1;
	let audioFile;
	let trackTitle;
	let trackArtist;
	let coverArt;
	let audioDB;

	if(browser) {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    let usr = getCookie('usr');
	
	if (tactileUsers.includes(usr)) {
		audioDB = audioData;
		console.log("Playin song for the tactile group");
	} else {
		audioDB = audioData_Normal;
		console.log("Playing for the normal group");
	}
	audioFile = new Audio(audioDB[trackIndex].url);
	trackTitle = audioDB[trackIndex].name;
	trackArtist = audioDB[trackIndex].artist;
	coverArt = audioDB[trackIndex].cover;
	}


	const loadTrack = () => {
		console.log(trackIndex);
		
		if (browser) {
			audioFile = new Audio(audioDB[trackIndex].url);
			audioFile.onloadedmetadata = () => {
				totalTrackTime = audioFile.duration;
				updateTime();
			}	
		}
		trackTitle = audioDB[trackIndex].name;
	}
	
	const autoPlayNextTrack = () => {
		if (trackIndex <= audioDB.length-1) {
			trackIndex += 1;
			loadTrack();
			audioFile.play();
		} else {
			trackIndex = 0;
			loadTrack();
			audioFile.play();
		}
	}
	
	// Track Duration and Progress Bar
	let totalTrackTime;
	//$: console.log(totalTrackTime)
	if (browser){
		audioFile.onloadedmetadata = () => {
			totalTrackTime = audioFile.duration;
			updateTime();
		}
	}

	
	let totalTimeDisplay = "loading...";
	let currTimeDisplay = "0:00:00";
	let progress = 0;
	let trackTimer;
	
	function updateTime() {
		progress = audioFile.currentTime * (100 / totalTrackTime);
		
		let currHrs = Math.floor((audioFile.currentTime / 60) / 60);
		let currMins = Math.floor(audioFile.currentTime / 60);
		let currSecs = Math.floor(audioFile.currentTime - currMins * 60);
		
		let durHrs = Math.floor( (totalTrackTime / 60) / 60 );
		let durMins = Math.floor( (totalTrackTime / 60) % 60 );
		let durSecs =  Math.floor(totalTrackTime - (durHrs*60*60) - (durMins * 60));
		
		if(currSecs < 10) currSecs = `0${currSecs}`;
		if(durSecs < 10) durSecs = `0${durSecs}`;
		if(currMins < 10) currMins = `0${currMins}`;
		if(durMins < 10) durMins = `0${durMins}`;
		
		currTimeDisplay = `${currHrs}:${currMins}:${currSecs}`;
		totalTimeDisplay = `${durHrs}:${durMins}:${durSecs}`;
		
		if (audioFile.ended) {
			toggleTimeRunning();
		}
	}
	
	const toggleTimeRunning = () => {
		if (audioFile.ended) {
			isPlaying = false;
			clearInterval(trackTimer);
			//console.log(`Ended = ${audioFile.ended}`);	
		} else {
			trackTimer = setInterval(updateTime, 100);
		}
	}
	
	// Controls
	let isPlaying = false;
	//$: console.log(`isPlaying = ${isPlaying}`)
	
	const playPauseAudio = () => {
		if (audioFile.paused) {
			toggleTimeRunning()
			audioFile.play();
			isPlaying = true;
			checkAudioProgress();
		} else {
			toggleTimeRunning()
			audioFile.pause();
			isPlaying = false;
		}	 	
	}
	
	const rewindAudio = () => audioFile.currentTime -= 10;
	const forwardAudio = () => audioFile.currentTime += 10;
	
	// Volume Slider
	let vol = 50;
	const adjustVol = () => audioFile.volume = vol / 100; 
	
	// Playlist
	const staticTrackIndex = trackIndex;
	let lessonIndex = 0;
	const handleTrack = (e) => {
		if (!isPlaying) {
			lessonIndex = Number(e.target.dataset.trackId);
			trackIndex = lessonIndex + staticTrackIndex;
			loadTrack();
			playPauseAudio(); // auto play
		} else {
			isPlaying = false;
			audioFile.pause();
			lessonIndex = Number(e.target.dataset.trackId);
			trackIndex = lessonIndex + staticTrackIndex;
			loadTrack();
			playPauseAudio(); // auto play
		}
	}

	function goBack()
	{
		audioFile.pause();
		goto("/Selection");
	}

	function getTrackNumber(number) {
		if (number >= 0 && number <= 3) {
			return 0;
		} else if (number >= 4 && number <= 7) {
			return 1;
		} else if (number >= 8 && number <= 11) {
			return 2;
		} else if (number >= 12 && number <= 15) {
			return 3;
		} else {
			return -1;
		}
	}

	let trackNr = getTrackNumber(trackIndex);
	let checkProgressInterval;
	let logged = false;
	async function checkAudioProgress() {
		clearInterval(checkProgressInterval); // Clear any existing intervals
	
		checkProgressInterval = setInterval(async () => {
			// Check if audioFile is playing
			if (!audioFile.paused) {
				const currentTime = audioFile.currentTime;
				const totalDuration = audioFile.duration;
				if (logged){
					logUpdateSession(currentTime);
				}

				if(!logged){
					logSession(trackNr, lessonIndex, 0);
					logged = true;
				}
				
			// Check if audio has played over 75% of its length
				if ((currentTime / totalDuration) > 0.75) {
					console.log("Audio has passed 75% of its length!" + trackNr + " " + lessonIndex);
					listenMatrix[trackNr][lessonIndex] = 1;
					const listenMatrixString = JSON.stringify(listenMatrix);
					logCompleted(true);
					if (browser) {
						document.cookie = `listenLog=${encodeURIComponent(listenMatrixString)}; max-age=31536000;path="/"`;
					};
					clearInterval(checkProgressInterval); // Stop checking progress until a sound starts again
				}
			}
		}, 5000); // Check every 5 seconds
	}
	
</script>

<style>
    .custom-padding {
        padding-top: 4px;
        padding-bottom: 4px;
    }
</style>

<main>
	<section id="player-cont">
		<div style="display: flex; justify-content: center; align-items: center;">
		<img src={coverArt} alt="Cover Art" style="width: 75%; height: 75%;">
	  </div>

		<TrackHeading artist={trackArtist} trackTitle={trackTitle} />

		<ProgressBarTime {currTimeDisplay}
										 {totalTimeDisplay}
										 {progress} />
		
		<Controls {isPlaying} 
							on:rewind={rewindAudio}
							on:playPause={playPauseAudio}
							on:forward={forwardAudio} />
		
	</section>
	
	<div class="flex justify-between items-start self-start space-x-2">
		<button
			type="button"
			class="shadow-sm rounded bg-sky-500 hover:bg-sky-600 text-lg text-white py-1 px-4 custom-padding"
			on:click={goBack}
			>
			Back
	 	 </button>

		<div class="flex-1"> 
    		<PlayList song = {trackIndex} on:click={handleTrack} />
  		</div>
	</div>	
</main>



