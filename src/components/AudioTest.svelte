<script>
    let usr = '';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment'; 
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
        <h3 class="font-bold mb-3 text-left text-cr text-gray-700">Lad os sikre os at lyden virker ved at trykke på <span class="text-gray-1000">Test Lyden</span></h3>
        <h1 class="mb-4 text-gray-500 text-xl text-center">Hørte du en lyd?</h1>
        <h1 class="mb-2 text-gray-500 text-base text-left">Hvis ikke, så følg disse trin for at få lyden til at fungere:</h1>
        
        <div class="flex items-center mb-3">
            <img class="w-24 h-24 rounded-full mr-2" src="https://raw.githubusercontent.com/razvysme/CI-Training-WebApp/main/src/lib/img/SpeakerIcon.png" alt="Speaker Image">
            <div>
              <h3 class="mb-0.5 text-gray-800">Tænd højtaleren</h3>
              <p class="text-gray-500 text-xs">Hold tændknappen i toppen af højtaleren nede i tre sekunder indtil du hører "tændelyden". Hvis du ikke hører noget, er højtaleren formentlig løbet tør for strøm, så tilslut den opladekablet.</p>
            </div>
        </div>
        <div class="flex items-center">
            <img class="w-24 h-24 rounded-full mr-2" src="https://raw.githubusercontent.com/razvysme/CI-Training-WebApp/main/src/lib/img/BtIcon.png" alt="Speaker Image">
            <div>
              <h3 class="mb-0.5 text-gray-800">Forbind med højtaleren</h3>
              <p class="text-gray-500 text-xs">Gå ind i <span class="font-bold">Indstillinger</span> på din telefon, find <span class="font-bold">Bluetooth</span> og vælg <span class="font-bold">SoundCore 2</span>. Hvis navnet ikke er på listen skal du holde <span class="font-bold">Bluetooth</span> knappen på højtaleren nede indtil højtaleren begynder at blinke. Derefter skal vente indtil den dukker op på listen så du kan vælge den på telefonen.</p>
            </div>
        </div>
    </div>
    
    <div class="flex justify-between space-x-2">
        <button
          type="button"
          class="my-11 flex-1/2 sm:flex-1/3 md:flex-1/2 lg:flex-1/2 xl:flex-1/2 shadow-sm rounded bg-sky-300 hover:bg-sky-600 text-lg text-white py-2 px-4"
          on:click={playTestAudio}
        >
          Test Lyden
        </button>
      
        <button
          type="continue"
          class="my-11 flex-1 shadow-sm rounded bg-sky-500 hover:bg-sky-600 text-lg text-white py-2 px-4"
        >
          Fortsæt
        </button>
      </div>
</form>