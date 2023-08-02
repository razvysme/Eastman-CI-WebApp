import { writable } from 'svelte/store';

export const currentTrack = writable(null);

//rows = tracks, collumns = lessons;
export let listenMatrix = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 9],
    ];

