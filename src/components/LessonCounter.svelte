<script>
    import Circle from './Circle.svelte';
    //import listensMatrix from "../stores/listenStore.js";
    let completedColor = '#DD6B20'
    let incompletedColor = '#C4C4C4'

    export let trackIndex = 1;

    export const listensMatrix = [
                [1, 1, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0],
                ];

    let rowData = listensMatrix[trackIndex];

    function getColor(value) {
        return value === 1 ? completedColor : incompletedColor;
  }
</script>

<main style="display: grid; grid-template-columns: repeat(5, 1fr); grid-gap: 0.4rem; ">
    {#each rowData as value}
        <Circle color={getColor(value)} />
    {/each}
</main>

