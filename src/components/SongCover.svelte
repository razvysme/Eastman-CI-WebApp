<script>
    import { audioData } from '../audioData.js';
    import TrackHeading from './TrackHeading.svelte';
    import { goto } from '$app/navigation';
    import { Router, Route } from 'svelte-routing';
    import Layout from '../routes/+layout.svelte';
    import MusicPage from "../routes/Music/+page.svelte";
    import LessonCounter from "./LessonCounter.svelte";
    import { setContext } from 'svelte';

    export let trackIndex = 1;

    let trackTitle = audioData[trackIndex].name;
    let trackArtist = audioData[trackIndex].artist;
    let coverArt = audioData[trackIndex].cover;
    
    function handleClick() {
        // Action to perform when the div is clicked
        setContext('trackIndex', trackIndex);
        console.log("Div clicked!");
        console.log(trackIndex);
        goto(`/Music`);
    }
</script>

<Router>
    <Layout>
      <Route path='/Music' component={MusicPage} /><Route/>
    </Layout>
</Router>


<button class="border border-gray-300 p-2 rounded-lg" on:click={handleClick}>
    <main>
        <section id="player-cont">
            <img src={coverArt} alt="Cover Art">
            <TrackHeading artist={trackArtist} trackTitle={trackTitle}/>
            <h3 class="mb-0.5 text-orange-600 text-left">Listened</h3>
            <LessonCounter trackIndex={trackIndex}/>
        </section>
    </main>
</button>


