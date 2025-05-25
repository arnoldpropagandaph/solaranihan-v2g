<script lang="ts">
  import { tricycles } from '$lib/stores/energy';
  import TricycleCard from './TricycleCard.svelte';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {#each $tricycles as tricycle (tricycle.id)}
    <TricycleCard {tricycle} />
  {/each}
</div>
