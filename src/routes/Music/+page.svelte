
<script>
	import AudioPlayer from './../../components/AudioPlayer.svelte';
    import {getContext} from 'svelte';

    let trackIndex = getContext('trackIndex');
    console.log("Music Page Loaded - " + trackIndex);
</script>

<main>
    <h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">The song of all songs</h1>
        <AudioPlayer {trackIndex}/>
</main>