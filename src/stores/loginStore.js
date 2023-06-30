import { writable } from 'svelte/store';
import {supabase} from '../supabase.js';

export const usrs = writable([]);

export const loadPlayData = async () => {
    const{data, error} = await supabase.from("TrainingLog").select();

    if(error) {
        return console.error(error);
    }
    usrs.set(data);
}

loadPlayData();

export const addUsr = async (Animal) => {
    const{data, error} = await supabase.from("TrainingLog").insert([{Animal}]);

    if(error) {
        return console.error(error);
    }
}

