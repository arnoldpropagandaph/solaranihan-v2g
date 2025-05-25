<script lang="ts">
  import { solarGenerationHistory } from '$lib/stores/energy';
  import { Card } from '$lib/components/ui/card';
  
  // Default data if store is empty
  const defaultData = Array(8).fill(0).map((_, i) => ({
    time: new Date().toISOString(),
    value: Math.random() * 100
  }));
  
  const chartData = $derived($solarGenerationHistory.length > 0 ? 
    $solarGenerationHistory : defaultData);
  
  const maxValue = 200; // Maximum capacity in kW
</script>

<Card class="p-4">
  <h3 class="text-lg font-semibold mb-4">Solar Generation</h3>
  
  <div class="relative h-48 w-full border border-gray-200 rounded-md p-4">
    <!-- Y-axis labels -->
    <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
      <span>{maxValue} kW</span>
      <span>{maxValue/2} kW</span>
      <span>0 kW</span>
    </div>
    
    <!-- Chart area -->
    <div class="ml-12 h-full flex items-end">
      {#each chartData as point, i}
        <div class="flex-1 flex flex-col items-center">
          <div 
            class="w-4/5 bg-yellow-400 rounded-t-sm" 
            style="height: {(point.value / maxValue) * 100}%"
          ></div>
          {#if i % 3 === 0}
            <span class="text-xs mt-1 text-gray-500">
              {new Date(point.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}  
            </span>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</Card>