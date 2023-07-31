<script>
    import LoginForm from "../components/LoginForm.svelte";
    import {usrs} from "../stores/loginStore.js";
    //import Layout from "./+layout.svelte";
    import AudioTest from "../components/AudioTest.svelte";
    import { getContext } from 'svelte';
    import { goto } from '$app/navigation';
  
    let usr = getContext('usr');
    //console.log(usr);
    
</script>

<main>
  {#if !usr}
    <LoginForm />
    {:else}
   {goto('/AudioTest')}
  {/if}
</main>


