<script>
     import SongCover from "../../components/SongCover.svelte";
     let trackIndices = [0, 1, 2, 3];
</script>


<main style="display: grid; grid-template-columns: repeat(2, 1fr); grid-gap: 1rem;">
  {#each trackIndices as trackIndex}
    <div>
      <SongCover {trackIndex}/>
    </div>
  {/each}
</main>
