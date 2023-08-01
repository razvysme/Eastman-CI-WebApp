<script>
	import { audioData } from '../audioData.js';
	import { goto } from '$app/navigation';
	import TrackHeading from './TrackHeading.svelte';
	import ProgressBarTime from './ProgressBarTime.svelte';
	import Controls from './Controls.svelte';
	//import VolumeSlider from './VolumeSlider.svelte';
	import PlayList from './PlayList.svelte';
	//import { Router, Route } from 'svelte-routing';
	//import SelectionPage from '../routes/Selection/+page.svelte';
	//import Layout from '../routes/+layout.svelte';
	import {listenMatrix} from './../stores/trackIndexStore.js';
	import { browser } from '$app/environment';

	
	// Get Audio track
	export let  trackIndex = 1;
	// $: console.log(trackIndex)
	let audioFile;
	let trackTitle;
	let trackArtist;
	let coverArt;

	if (browser){
		audioFile = new Audio(audioData[trackIndex].url);
		trackTitle = audioData[trackIndex].name;
		trackArtist = audioData[trackIndex].artist;
		coverArt = audioData[trackIndex].cover;
	}

	const loadTrack = () => {
		console.log(trackIndex);
		
		if (browser) {
			audioFile = new Audio(audioData[trackIndex].url);
			audioFile.onloadedmetadata = () => {
				totalTrackTime = audioFile.duration;
				updateTime();
			}	
		}
		trackTitle = audioData[trackIndex].name;
	}
	
	const autoPlayNextTrack = () => {
		if (trackIndex <= audioData.length-1) {
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
	async function checkAudioProgress() {
	clearInterval(checkProgressInterval); // Clear any existing intervals
	
		checkProgressInterval = setInterval(async () => {
			// Check if audioFile is playing
			if (!audioFile.paused) {
				const currentTime = audioFile.currentTime;
				const totalDuration = audioFile.duration;
				
			// Check if audio has played over 75% of its length
				if ((currentTime / totalDuration) > 0.02) {
					console.log("Audio has passed 75% of its length!" + trackNr + " " + lessonIndex);
					listenMatrix[trackNr][lessonIndex] = 1;
					const listenMatrixString = JSON.stringify(listenMatrix);
					if (browser) {
						document.cookie = `listenMatrix=${encodeURIComponent(listenMatrixString)}; max-age=31536000;path="/"`;
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
		<img src={coverArt} alt="Cover Art">

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
			Tilbage
	 	 </button>

		<div class="flex-1"> 
    		<PlayList song = {trackIndex} on:click={handleTrack} />
  		</div>
	</div>	
</main>



