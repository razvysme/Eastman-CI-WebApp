<script>
    let usr = '';
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';

    const animal = "Torsk2";

    const handleSubmit = () => {
        //addUsr(usr);
        //console.log(usr)
        //usr='';
        if (browser) {
            document.cookie = `usr=${usr};max-age=31536000;path="/"`;
            };
        goto('/Selection');
    }
</script>



<form class="my-11 " on:submit|preventDefault={handleSubmit}>
    <div class="flex flex-col text-lg mb-2">
        <h3 class="font-bold mb-3 text-left text-cr text-gray-700">Først skal vi vide lidt om dig</h3>
        <input type="text" bind:value={usr} name="todo" placeholder="Skriv dit dyr her" 
            class="appearance-none shadow-sm border border-gray-200 p-2 
            focus:outline-none focus:border-gray-500 rounded-lg"/>
    </div>
    <button type="continue" class="my-11 w-full shadow-sm rounded bg-sky-500 hover:bg-sky-600 text-lg text-white py-2 px-4">Fortsæt</button>
</form>

<!--<button type="continue" class="w-full shadow-sm rounded bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 fixed left-1/2 transform -translate-x-1/2 bottom-10">Continue</button>-->