<script>
    let usr = '';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import {logVisit} from "../stores/logStore.js";

    const animal = "Torsk2";
    let audioFile;

    if (browser) {
     audioFile = new Audio("https://raw.githubusercontent.com/razvysme/CI-Training-WebApp/main/src/lib/audio/Chimes.mp3");
      //const audioFile = new Audio("src/lib/audio/Chimes.mp3");
    }

    function playTestAudio() 
    {
        //console.log('Playing test audio...');
        audioFile.play();
    }

    onMount(() => {
      playTestAudio(); // Call the function when the component is mounted
      console.log("Mounting test audio...");
    });

    const handleSubmit = () => {
        //addUsr(usr);
        //console.log(usr)
        //usr='';
        goto('/Selection');
    };

    
</script>

<style>
    .text-cr {
      /* Custom text size */
      font-size: 1.3rem; /* Adjust the size value as needed */
    }
  </style>

<form class="my-11 " on:submit|preventDefault={handleSubmit}>
    <div class="flex flex-col text-lg">
        <h3 class="font-bold mb-3 text-left text-cr text-gray-700">Let's make sure the sound works when you press on  <span class="text-gray-1000">Test Sound</span></h3>
        <h1 class="mb-4 text-gray-500 text-xl text-center">Did you hear a sound?</h1>
        <h1 class="mb-2 text-gray-500 text-base text-left">If not, follow these steps to make the sound work:</h1>
        
        <div class="flex items-center mb-3">
            <img class="w-24 h-24 rounded-full mr-2" src="https://d3spngajmc7mtz.cloudfront.net/img/SonySpeaker.jpg" alt="Speaker Image">
            <div>
              <h3 class="mb-0.5 text-gray-800">Turn on the speaker</h3>
              <p class="text-gray-500 text-xs">Hold down the power button at the top of the speaker for three seconds until you hear the "power on" sound. If you don't hear anything, the speaker is probably out of power, so connect it to the charging cable.</p>
            </div>
        </div>
        <div class="flex items-center">
            <img class="w-24 h-24 rounded-full mr-2" src="https://raw.githubusercontent.com/razvysme/CI-Training-WebApp/main/src/lib/img/BtIcon.png" alt="Speaker Image">
            <div>
              <h3 class="mb-0.5 text-gray-800">Connect to the speaker</h3>
              <p class="text-gray-500 text-xs">Go to <span class="font-bold">Settings</span> on your phone, find <span class="font-bold">Bluetooth</span> 
                and choose <span class="font-bold">SONY SRSXB13/B</span>. If the name is not on the list, hold the <span class="font-bold">Bluetooth</span> 
                button on the speaker until the light starts blinking. It should appear on the bluetooth list on your phone in a few seconds.</p>
            </div>
        </div>
    </div>
    
    <div class="flex justify-between space-x-2">
        <button
          type="button"
          class="my-11 flex-1/2 sm:flex-1/3 md:flex-1/2 lg:flex-1/2 xl:flex-1/2 shadow-sm rounded bg-sky-300 hover:bg-sky-600 text-lg text-white py-2 px-4"
          on:click={playTestAudio}
        >
          Test Sound
        </button>
      
        <button
          type="continue"
          class="my-11 flex-1 shadow-sm rounded bg-sky-500 hover:bg-sky-600 text-lg text-white py-2 px-4"
          on:click={logVisit()}
          >
          Next
        </button>
      </div>
</form>