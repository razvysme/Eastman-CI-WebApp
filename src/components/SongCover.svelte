<script>
    import { audioData } from '../audioData.js';
    import TrackHeading from './TrackHeading.svelte';
    import { goto } from '$app/navigation';
    import LessonCounter from "./LessonCounter.svelte";
    import { currentTrack } from './../stores/trackIndexStore.js';

    export let trackIndex = 1;

    let trackTitle = audioData[trackIndex].name;
    let trackArtist = audioData[trackIndex].artist;
    let coverArt = audioData[trackIndex].cover;
    //console.log(audioData[0], audioData[5], audioData[10],audioData[15]);
    
    function handleClick() {
        //console.log(trackIndex);
        currentTrack.set(trackIndex); // Set the value of trackIndex
        goto(`/Music`);
    }
    //console.log(trackIndex);
</script>

<button class="border border-gray-300 p-2 rounded-lg" on:click={handleClick}>
    <main>
        <section id="player-cont">
            <img src={coverArt} alt="Cover Art">
            <TrackHeading artist={trackArtist} trackTitle={trackTitle}/>
            <h3 class="mb-0.5 text-orange-600 text-left">Lyttet</h3>
            <LessonCounter trackIndex={trackIndex / 4}/>
        </section>
    </main>
</button>


