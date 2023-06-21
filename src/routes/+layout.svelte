
<script>
  import '../tailwind.css'
  import '../app.css'
  import {supabase} from '../supabase.js';
  import { setContext } from 'svelte';
  //console.log(supabase);

  let usr;

  try {
    const usrCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('usr='));

  if (usrCookie) {
    usr = usrCookie.split('=')[1];
    console.log('Cookies exist:', usr);
    setContext('usr', usr);
  } else {
    throw new Error('No cookies found');
  }
} catch (error) {
  console.log(error.message);
}

</script>


<div class="container mx-auto my-6 max-w-xs">   
  <slot></slot>
</div>

