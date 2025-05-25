<script lang="ts">
    import { simulation } from '$lib/stores/simulation';
    import { Button } from '$lib/components/ui/button';
    import { Slider } from '$lib/components/ui/slider';
    import { 
      Play, 
      Pause, 
      FastForward, 
      SkipForward 
    } from 'lucide-svelte';
    
    function togglePlayPause() {
      if ($simulation.isPlaying) {
        simulation.pause();
      } else {
        simulation.play();
      }
    }
    
    function handleSpeedChange(value: number[]) {
      simulation.setSpeed(value[0]);
    }
  </script>
  
  <div class="flex items-center gap-4">
    <div class="flex items-center gap-2">
      <Button
        size="icon"
        variant={$simulation.isPlaying ? "default" : "outline"}
        onclick={togglePlayPause}
      >
        {#if $simulation.isPlaying}
          <Pause class="h-4 w-4" />
        {:else}
          <Play class="h-4 w-4" />
        {/if}
      </Button>
      
      <Button
        size="icon"
        variant="outline"
        onclick={() => simulation.setSpeed(3600)}
      >
        <FastForward class="h-4 w-4" />
      </Button>
    </div>
    
    <div class="flex items-center gap-2">
      <span class="text-sm text-muted-foreground">Speed:</span>
      <div class="w-32">
        <Slider
          value={[$simulation.speed]}
          min={1}
          max={3600}
          step={60}
          onValueChange={handleSpeedChange}
        />
      </div>
      <span class="text-sm font-medium">
        {$simulation.speed < 60 ? `${$simulation.speed}s` : `${$simulation.speed / 60}m`}/s
      </span>
    </div>
  </div>