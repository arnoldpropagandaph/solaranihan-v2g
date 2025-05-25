<script lang="ts">
    import { terminalStats } from '$lib/stores/energy';
    import { formattedTime } from '$lib/stores/simulation';
    import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
    import { Progress } from '$lib/components/ui/progress';
    import { 
      Sun, 
      Zap, 
      TrendingUp, 
      TrendingDown,
      Battery,
      Coins
    } from 'lucide-svelte';
    
    // Svelte 5 reactive statements with $derived
    const solarPercentage = $derived($terminalStats.solarGeneration / 200 * 100);
    const priceIndicator = $derived($terminalStats.gridPrice > 7 ? 'high' : 'normal');
  </script>
  
  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <CardTitle>Terminal Overview</CardTitle>
        <div class="text-2xl font-bold">{$formattedTime}</div>
      </div>
    </CardHeader>
    <CardContent>
      <div class="grid gap-6 md:grid-cols-4">
        <!-- Solar Generation -->
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <Sun class="h-5 w-5 text-yellow-500" />
            <span class="text-sm font-medium">Solar Generation</span>
          </div>
          <div class="text-2xl font-bold">{$terminalStats.solarGeneration.toFixed(1)} kW</div>
          <Progress value={solarPercentage} class="h-2" />
          <p class="text-xs text-muted-foreground">
            {solarPercentage.toFixed(0)}% of capacity
          </p>
        </div>
        
        <!-- Grid Price -->
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <Zap class="h-5 w-5 text-blue-500" />
            <span class="text-sm font-medium">Grid Price</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-2xl font-bold">₱{$terminalStats.gridPrice.toFixed(2)}</span>
            <span class="text-sm text-muted-foreground">/kWh</span>
          </div>
          {#if priceIndicator === 'high'}
            <div class="flex items-center gap-1 text-orange-500">
              <TrendingUp class="h-4 w-4" />
              <span class="text-xs">Peak pricing</span>
            </div>
          {:else}
            <div class="flex items-center gap-1 text-green-500">
              <TrendingDown class="h-4 w-4" />
              <span class="text-xs">Normal pricing</span>
            </div>
          {/if}
        </div>
        
        <!-- Battery Capacity -->
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <Battery class="h-5 w-5 text-green-500" />
            <span class="text-sm font-medium">Available Battery</span>
          </div>
          <div class="text-2xl font-bold">
            {$terminalStats.availableBatteryCapacity.toFixed(0)} kWh
          </div>
          <Progress 
            value={$terminalStats.availableBatteryCapacity / $terminalStats.totalBatteryCapacity * 100} 
            class="h-2" 
          />
          <p class="text-xs text-muted-foreground">
            of {$terminalStats.totalBatteryCapacity} kWh total
          </p>
        </div>
        
        <!-- Community Earnings -->
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <Coins class="h-5 w-5 text-yellow-600" />
            <span class="text-sm font-medium">Community Earnings</span>
          </div>
          <div class="text-2xl font-bold">
            ₱{$terminalStats.communityEarnings.toFixed(0)}
          </div>
          <div class="flex gap-4 text-xs">
            <span class="text-green-600">
              +{$terminalStats.tokensMinted} ARAW
            </span>
            <span class="text-orange-600">
              -{$terminalStats.tokensBurned} ARAW
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>