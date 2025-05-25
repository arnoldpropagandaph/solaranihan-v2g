<script lang="ts">
  import { gridPriceHistory } from '$lib/stores/energy';
  import { Card } from '$lib/components/ui/card';
  
  // Default data if store is empty
  const defaultData = Array(8).fill(0).map((_, i) => ({
    time: new Date().toISOString(),
    value: 5 + Math.random() * 5
  }));
  
  const chartData = $derived($gridPriceHistory.length > 0 ? 
    $gridPriceHistory : defaultData);
  
  const maxValue = 15; // Maximum price in PHP/kWh
</script>

<Card class="p-4">
  <h3 class="text-lg font-semibold mb-4">Grid Price</h3>
  
  <div class="relative h-48 w-full border border-gray-200 rounded-md p-4">
    <!-- Y-axis labels -->
    <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
      <span>₱{maxValue}</span>
      <span>₱{maxValue/2}</span>
      <span>₱0</span>
    </div>
    
    <!-- Chart area -->
    <div class="ml-12 h-full flex items-end">
      {#each chartData as point, i}
        <div class="flex-1 flex flex-col items-center">
          <div 
            class="w-4/5 bg-blue-400 rounded-t-sm" 
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
