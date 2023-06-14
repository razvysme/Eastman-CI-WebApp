
<script>
    import '../tailwind.css'
    import '../app.css'
    import {supabase} from '../supabase.js';
    console.log(supabase);
  </script>


<div class="container mx-auto my-6 max-w-xs">   
  <slot></slot>
</div>

