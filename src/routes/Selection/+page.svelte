<script>
    import SongCover from "../../components/SongCover.svelte";
    import { listenMatrix } from "../../stores/trackIndexStore.js";
    import { browser } from '$app/environment';
    let trackIndices = [0, 4, 8, 12];

    if (browser) {
      try {
        const listenMatrixCookie = document.cookie.split('; ').find(row => row.startsWith('listenMatrix='));

        if (listenMatrixCookie) {
            const listenMatrixEncoded = listenMatrixCookie.split('=')[1]
            const decodedCookieValue = decodeURIComponent(listenMatrixEncoded);
            const restoredListenMatrix = JSON.parse(decodedCookieValue);
            console.log("Restored listen matrix is: "+ restoredListenMatrix);
            for (let i = 0; i < 4; i++){
              for (let j = 0; j < 5; j++){
                listenMatrix[i][j] = restoredListenMatrix[i][j];
              }}
        } else {
          for (let i = 0; i < 4; i++){
            for (let j = 0; j < 5; j++){
              listenMatrix[i][j] = 0;
          }}
          throw new Error('No listenMatrix cookie found. Defaulting to ' + listenMatrix);
        }
      } 
        catch (error) {
          console.log(error.message);
      } 
    }
</script>

<main style="display: grid; grid-template-columns: repeat(2, 1fr); grid-gap: 1rem;">
  {#each trackIndices as trackIndex}
    <div>
      <SongCover {trackIndex}/>
    </div>
  {/each}
</main>
