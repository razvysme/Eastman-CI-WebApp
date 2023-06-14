<script>
    import LoginForm from "../components/LoginForm.svelte";
    import {usrs} from "../stores/loginStore.js";
    import { Router, Route } from 'svelte-routing';
    import Layout from "./+layout.svelte";
</script>

<Router>
    <Layout>
      <Route path="/Music"/><Route/>
    </Layout>
  </Router>

<main>
    <h1 class = "text-2xl fond-bold text-center text-gray-800 md:text-3xl">Music Training</h1>
    <LoginForm/>
</main>

