<script lang="ts">
  import { tricycles } from '$lib/stores/tricycles';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { TrendingUp } from 'lucide-svelte';
  
  // Sort tricycles by earnings
  const sortedTricycles = $derived([...$tricycles].sort((a, b) => 
    (b.dailyEarnings?.v2g || 0) - (a.dailyEarnings?.v2g || 0)
  ).slice(0, 5));
</script>

<Card>
  <CardHeader>
    <CardTitle class="flex items-center gap-2">
      <TrendingUp class="h-5 w-5 text-green-500" />
      <span>V2G Earnings Leaderboard</span>
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div class="space-y-4">
      {#if sortedTricycles.length === 0}
        <p class="text-center text-muted-foreground">No data available</p>
      {:else}
        {#each sortedTricycles as tricycle, index}
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                {index + 1}
              </div>
              <div>
                <p class="font-medium">{tricycle.driverName}</p>
                <p class="text-sm text-muted-foreground">{tricycle.name}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-bold">₱{(tricycle.dailyEarnings?.v2g || 0).toFixed(2)}</p>
              <p class="text-xs text-green-500">
                {((tricycle.dailyEarnings?.v2g || 0) / (tricycle.dailyEarnings?.total || 1) * 100).toFixed(0)}% of income
              </p>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </CardContent>
</Card>
