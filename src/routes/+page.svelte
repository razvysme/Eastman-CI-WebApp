<script>
    import LoginForm from "../components/LoginForm.svelte";
    import {usrs} from "../stores/loginStore.js";
    import { Router, Route } from 'svelte-routing';
    import Layout from "./+layout.svelte";
    import AudioTest from "../components/AudioTest.svelte";
    import { getContext } from 'svelte';
  
    let usr = getContext('usr');
    //console.log(usr);
    
</script>

<Router>
  <Layout>
    <Route path="/Selection"/><Route/>
  </Layout>
</Router>


<main>
  {#if !usr}
    <LoginForm />
    {:else}
    <AudioTest/>
  {/if}
</main>


