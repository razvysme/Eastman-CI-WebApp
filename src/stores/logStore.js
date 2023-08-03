import { writable } from 'svelte/store';
import {supabase} from '../supabase.js';
import { browser } from '$app/environment';

let usr;
let id;

if(browser) {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    usr = getCookie('usr');
    //console.log(usr);
}
  
export const logVisit = async (Animal=usr) => {
    console.log("Visited");
    const{data, error} = await supabase.from("TrainingLog").insert([{Animal}]);
    if(error) {
        console.log("erroring");
        return console.error(error);
    }
}

export const logSession = async (Track, Lesson, S_Length = 0) => {
    //console.log("Session Started");
    let Animal = getCookie('usr');
    const{data, error} = await supabase.from("TrainingLog").insert([{Animal, Track, Lesson, S_Length}]).select();
    id = data[0].id;
    if(error) {
        console.log("erroring");
        return console.error(error);
    }
}

export const logUpdateSession = async (S_Length) => {
   //console.log("Updating Session");
    const{data, error} = await supabase.from("TrainingLog").update({S_Length}).match({id});
    if(error) {
        console.log("erroring in update");
        return console.error(error);
    }
}

export const logCompleted = async (Completed = true) => {
    //console.log("Lection Completed");
    const{data, error} = await supabase.from("TrainingLog").update({Completed}).match({id});
    if(error) {
        console.log("erroring in update");
        return console.error(error);
    }
}