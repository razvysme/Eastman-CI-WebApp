<script>
    import LoginForm from "../components/LoginForm.svelte";
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


