<script>
    let todo = '';
    import {addTodo} from "../stores/todoStore.js";
    const handleSubmit = () => {
        addTodo(todo);
        todo='';
        console.log("submitting")
    }
</script>

<form class="my-6" on:submit|preventDefault ={handleSubmit}>
    <div class="flex flex-col text-sm mb-2 ">
        <label class="font-bold mb-2 text-gray-800" for="todo">First, we need to know who you are</label>
        <input type="text" bind:value={todo} name="todo" placeholder="Insert your animal name here" 
            class="appearance-none shadow-sm border border-gray-200 p-2 
            focus:outline-none focus:border-gray-500 rounded-lg"/>
    </div>
    <button type="continue" class="w-full shadow-sm rounded 
    bg-sky-500 hover:bg-sky-600 text-white py-2 px-4">Continue</button>
  
</form>