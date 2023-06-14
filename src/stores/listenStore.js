import { writable } from 'svelte/store';
import {supabase} from '../supabase.js';

export const listensMatrix = [
[1, 1, 0, 0, 0],
[0, 0, 1, 0, 0],
[1, 1, 1, 1, 1],
[1, 0, 0, 0, 0],
];