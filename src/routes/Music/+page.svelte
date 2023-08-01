
<script>
	import { currentTrack } from './../../stores/trackIndexStore.js';
	import AudioPlayer from './../../components/AudioPlayer.svelte';
 
    export let trackIndex;

    currentTrack.subscribe(value => {
        trackIndex = value;
        //console.log("Music Page Loaded - " + trackIndex);
    });
    
</script>

<main>
    <AudioPlayer {trackIndex}/>
</main>