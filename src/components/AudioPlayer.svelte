<script>
	import { audioData } from '../audioData.js';
	import { goto } from '$app/navigation';
	import TrackHeading from './TrackHeading.svelte';
	import ProgressBarTime from './ProgressBarTime.svelte';
	import Controls from './Controls.svelte';
	import VolumeSlider from './VolumeSlider.svelte';
	import PlayList from './PlayList.svelte';
	import { Router, Route } from 'svelte-routing';
	import SelectionPage from '../routes/Selection/+page.svelte';
	import Layout from '../routes/+layout.svelte';
	
	// Get Audio track
	export let  trackIndex = 1;
	// $: console.log(trackIndex)
	let audioFile = new Audio(audioData[trackIndex].url);
	let trackTitle = audioData[trackIndex].name;
	let trackArtist = audioData[trackIndex].artist;
	let coverArt = audioData[trackIndex].cover;


	
	const loadTrack = () => {
		audioFile = new Audio(audioData[trackIndex].url);
		audioFile.onloadedmetadata = () => {
			totalTrackTime = audioFile.duration;
			updateTime();
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
	$: console.log(totalTrackTime)
	audioFile.onloadedmetadata = () => {
		totalTrackTime = audioFile.duration;
		updateTime();
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
			console.log(`Ended = ${audioFile.ended}`);	
		} else {
			trackTimer = setInterval(updateTime, 100);
		}
	}
	

	// Controls
	let isPlaying = false;
	$: console.log(`isPlaying = ${isPlaying}`)
	
	const playPauseAudio = () => {
		if (audioFile.paused) {
			toggleTimeRunning()
			audioFile.play();
			isPlaying = true;
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
	const handleTrack = (e) => {
		if (!isPlaying) {
			trackIndex = Number(e.target.dataset.trackId);
			loadTrack();
			playPauseAudio(); // auto play
		} else {
			isPlaying = false;
			audioFile.pause();
			trackIndex = Number(e.target.dataset.trackId);
			loadTrack();
			playPauseAudio(); // auto play
		}
	}

	function goBack()
	{
		goto("/Selection");
	}
	
</script>

<Router>
	<Layout>
		<Route path="/Selection" component={SelectionPage} /><Route/>
	</Layout>
</Router>


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
	
	<div class="flex justify-between items-start space-x-3">
		<button
			type="button"
			class="my-11 self-start flex-1/2 sm:flex-1/3 md:flex-1/2 lg:flex-1/2 xl:flex-1/2 shadow-sm rounded bg-sky-500 hover:bg-sky-600 text-lg text-white py-2 px-4"
			on:click={goBack}
			>
			Back
	 	 </button>

		<div class="flex-1"> <!-- Add flex-1 class to make PlayList fill the available space -->
    		<PlayList on:click={handleTrack} />
  		</div>
	</div>

	
</main>

