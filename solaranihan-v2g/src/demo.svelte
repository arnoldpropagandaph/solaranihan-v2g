<script lang="ts">
  import { onMount } from 'svelte';
  
  let count = 0;
  
  function increment() {
    count += 1;
  }
  
  onMount(() => {
    console.log('Demo component mounted');
  });
</script>

<div class="demo-container">
  <h1>Simple Working Demo</h1>
  
  <div class="card">
    <p>Count: {count}</p>
    <button on:click={increment}>Increment</button>
  </div>
  
  <div class="info">
    <p>This is a simple demo component that works without Tailwind CSS.</p>
  </div>
</div>

<style>
  .demo-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #0ea5e9;
  }
  
  .card {
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  p {
    margin-bottom: 1rem;
    font-size: 1.125rem;
  }
  
  button {
    background-color: #0ea5e9;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    font-size: 1rem;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0284c7;
  }
  
  .info {
    padding: 1rem;
    background-color: #f0f9ff;
    border-radius: 0.5rem;
    border-left: 4px solid #0ea5e9;
  }
</style>
