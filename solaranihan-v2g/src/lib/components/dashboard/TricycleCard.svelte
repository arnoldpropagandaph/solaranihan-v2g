<script lang="ts">
    import type { TricycleState } from '$lib/types';
    import { Card, CardContent, CardHeader } from '$lib/components/ui/card';
    import { Badge } from '$lib/components/ui/badge';
    import { Progress } from '$lib/components/ui/progress';
    import { Button } from '$lib/components/ui/button';
    import { 
      Battery, 
      BatteryCharging, 
      Car, 
      Home, 
      Zap,
      TrendingUp,
      DollarSign,
      Building
    } from 'lucide-svelte';
    import { cn } from '$lib/utils/cn';
    
    interface Props {
      tricycle: TricycleState;
      index: number;
    }
    
    const { tricycle, index } = $props();

    const batteryPercentage = $derived(tricycle.batteryLevel);
    const isCharging = $derived(tricycle.status === 'charging');
    const isDischarging = $derived(tricycle.status === 'discharging');
    const isIdle = $derived(tricycle.status === 'idle');
    const statusColor = $derived(isCharging ? 'text-emerald' : 
                      isDischarging ? 'text-amber' : 
                      'text-slate');
    const statusText = $derived(isCharging ? 'Charging' : 
                   isDischarging ? 'Discharging' : 
                   'Idle');
    const animationClass = $derived(isCharging ? 'animate-pulse-green' : 
                       isDischarging ? 'animate-pulse-orange' : 
                       '');

    const batteryIcon = $derived(() => {
      if (tricycle.status === 'charging') return BatteryCharging;
      return Battery;
    });
    
    const locationIcon = $derived(() => {
      switch (tricycle.location) {
        case 'driving': return Car;
        case 'home': return Home;
        default: return Zap;
      }
    });
    
    function showDriverStory() {
      // Dispatch event or call global function
      console.log('Show story for', tricycle.driverName);
    }
  </script>
  
  <Card class={cn(
    "transition-all duration-300 hover:shadow-lg",
    tricycle.status === 'charging' && "ring-2 ring-green-500 ring-opacity-50",
    tricycle.status === 'discharging' && "ring-2 ring-orange-500 ring-opacity-50"
  )}>
    <CardHeader class="pb-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img 
            src={tricycle.avatar} 
            alt={tricycle.driverName}
            class="h-10 w-10 rounded-full"
          />
          <div>
            <h3 class="font-semibold">{tricycle.driverName}</h3>
            <Badge variant="outline" class="text-xs">
              {tricycle.id}
            </Badge>
          </div>
        </div>
        <Button variant="ghost" size="sm" onclick={showDriverStory}>
          <TrendingUp class="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
    
    <CardContent class="space-y-4">
      <!-- Battery Status -->
      <div class="space-y-2">
        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center gap-2">
            {#if batteryIcon() === BatteryCharging}
              <BatteryCharging class="h-4 w-4 {statusColor}" />
            {:else}
              <Battery class="h-4 w-4 {statusColor}" />
            {/if}
            <span>Battery</span>
          </div>
          <span class="font-medium">{tricycle.batteryLevel}%</span>
        </div>
        <Progress value={tricycle.batteryLevel} class="h-2" />
        {#if tricycle.status === 'charging'}
          <p class="text-xs text-green-600">+{tricycle.chargeRate} kW</p>
        {:else if tricycle.status === 'discharging'}
          <p class="text-xs text-orange-600">-{tricycle.dischargeRate} kW</p>
        {/if}
      </div>
      
      <!-- Location & Status -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          {#if locationIcon() === Car}
            <Car class="h-4 w-4 text-muted-foreground" />
          {:else if locationIcon() === Home}
            <Home class="h-4 w-4 text-muted-foreground" />
          {:else}
            <Zap class="h-4 w-4 text-muted-foreground" />
          {/if}
          <span class="text-sm capitalize">{tricycle.location}</span>
        </div>
        <Badge variant={tricycle.status === 'idle' ? 'secondary' : 'default'}>
          {tricycle.status}
        </Badge>
      </div>
      
      <!-- Wallet Balance -->
      <div class="grid grid-cols-2 gap-2 rounded-lg bg-muted p-3">
        <div>
          <p class="text-xs text-muted-foreground">Peso</p>
          <p class="font-semibold">₱{tricycle.walletBalance.peso.toFixed(2)}</p>
        </div>
        <div>
          <p class="text-xs text-muted-foreground">ARAW</p>
          <p class="font-semibold">{tricycle.walletBalance.araw}</p>
        </div>
      </div>
      
      <!-- Daily Earnings -->
      <div class="space-y-1 border-t pt-3">
        <div class="flex items-center justify-between text-xs">
          <span class="text-muted-foreground">Transport</span>
          <span>₱{tricycle.dailyEarnings.transport}</span>
        </div>
        <div class="flex items-center justify-between text-xs">
          <span class="text-muted-foreground">V2G</span>
          <span>₱{tricycle.dailyEarnings.v2g}</span>
        </div>
        <div class="flex items-center justify-between text-sm font-semibold">
          <span>Total Today</span>
          <span class="text-green-600">₱{tricycle.dailyEarnings.total}</span>
        </div>
      </div>
    </CardContent>
  </Card>