<script>
	import { audioData, audioData_Normal } from '../audioData.js';
	import {tactileUsers } from "../stores/userList.js"
	import { browser } from '$app/environment';
	let listIsShowing = false;
	let usr;

	if(browser) {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    usr = getCookie('usr');
    //console.log(usr);
}

	export let song = 0;

	let truncAudioData;
	if (tactileUsers.includes(usr)) {
  		truncAudioData = audioData.slice(song, song + 4);
		console.log("Playlist loaded for the tactile group");
	} else {
  		truncAudioData = audioData_Normal.slice(song, song + 4);
		console.log("Normal playlist loade");
	}
	// = audioData.slice(song, song + 4);
	//console.log(truncAudioData);
	
	const showPlayList = () => listIsShowing = !listIsShowing;

</script>

<section id="playlist-cont">
	<button class="accordion border border-gray-300 p-2 rounded-lg"
		class:active={listIsShowing}
		on:click={showPlayList}>&#9776; Lektion List
	</button>

	<ul class:show-list={listIsShowing}>
		{#each truncAudioData as {lesson}, i}
			<li data-track-id={i} on:click> {lesson}</li>
		{/each}
	</ul>
</section>


<style>
	section#playlist-cont {
		border: 1px solid #8d9094;
    	border-radius: 0.5rem;
    	background-color: #FFFFFF;
	}
	
	/* Style the buttons that are used to open and close the accordion panel */
	button.accordion {		
		margin: 0;
		padding: 5px 15px;
		width: 100%;
/* 		text-align: left; */
		border: none;
		outline: none;
		cursor: pointer;
		transition: 0.4s;
	}

	/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
	button.active {
		color: #DD6B20;
	}
	
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		border-radius: 0 0 5px 5px;
		height: 0;
		overflow: auto;
		transition: height .3s;
	}
	
	li {
		line-height: 150%;
		padding: 5px 5px 5px 20px;
		border-bottom: 1px solid #3a3a3a;
		cursor: pointer;
	}
	
	li:active, li:hover {
		background-color: #60A5FA;
	}
	
	.show-list {
		height: 140px;
	}
</style>