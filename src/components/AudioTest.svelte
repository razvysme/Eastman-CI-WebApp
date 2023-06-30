<script>
    let usr = '';
    import { goto } from '$app/navigation';
    import {addUsr} from "../stores/loginStore.js";
    import MusicPage from "../routes/Music/+page.svelte";
    import { Router, Route } from 'svelte-routing';
    import Layout from '../routes/+layout.svelte';
    import SelectionPage from '../routes/Selection/+page.svelte';
    import { onMount } from 'svelte';
    
    const animal = "Torsk2";
    const audioFile = new Audio("src/lib/audio/Chimes.mp3");
    const handleSubmit = () => {
        //addUsr(usr);
        //console.log(usr)
        //usr='';
        goto('/Selection');
    };

    function playTestAudio() 
    {
        //console.log('Playing test audio...');
        audioFile.play();
    }

    onMount(() => {
    //playTestAudio(); // Call the function when the component is mounted
    console.log("Mounting test audio...");
  });

</script>

<style>
    .text-cr {
      /* Custom text size */
      font-size: 1.3rem; /* Adjust the size value as needed */
    }
  </style>

<Router>
    <Layout>
      <Route path="/Music" component={MusicPage} /><Route/>
      <Route path="/Selection" component={SelectionPage} /><Route/>
    </Layout>
</Router>

<form class="my-11 " on:submit|preventDefault={handleSubmit}>
    <div class="flex flex-col text-lg">
        <h3 class="font-bold mb-3 text-left text-cr text-gray-700">Let's check if the sound works, by pressing <span class="text-gray-1000">Test Sound</span></h3>
        <h1 class="mb-4 text-gray-500 text-xl text-center">Did you hear a sound?</h1>
        <h1 class="mb-2 text-gray-500 text-base text-left">If not, here are the steps to make it work:</h1>
        
        <div class="flex items-center mb-3">
            <img class="w-24 h-24 rounded-full mr-2" src="src/lib/img/SpeakerIcon.png" alt="Speaker Image">
            <div>
              <h3 class="mb-0.5 text-gray-800">Turn on the speaker</h3>
              <p class="text-gray-500 text-xs">Hold the power button on the top of the speaker for 3 seconds, until you hear the "turn on" sound. If nothing happens, it's probably out of battery, so connect the charging cable.</p>
            </div>
        </div>
        <div class="flex items-center">
            <img class="w-24 h-24 rounded-full mr-2" src="src/lib/img/BtIcon.png" alt="Speaker Image">
            <div>
              <h3 class="mb-0.5 text-gray-800">Connect to the speaker</h3>
              <p class="text-gray-500 text-xs">In your phone, go to <span class="font-bold">Settings</span>, find <span class="font-bold">Bluetooth</span> and select <span class="font-bold">SoundCore 2</span>. If the name is not on the list, hold the <span class="font-bold">Bluetooth</span> button on the speaker until it starts blinking and wait for it to appear on the list so you can select it on the phone.</p>
            </div>
        </div>
    </div>
    
    <div class="flex justify-between space-x-2">
        <button
          type="button"
          class="my-11 flex-1/2 sm:flex-1/3 md:flex-1/2 lg:flex-1/2 xl:flex-1/2 shadow-sm rounded bg-sky-300 hover:bg-sky-600 text-lg text-white py-2 px-4"
          on:click={playTestAudio}
        >
          Test sound
        </button>
      
        <button
          type="continue"
          class="my-11 flex-1 shadow-sm rounded bg-sky-500 hover:bg-sky-600 text-lg text-white py-2 px-4"
        >
          Continue
        </button>
      </div>
</form>