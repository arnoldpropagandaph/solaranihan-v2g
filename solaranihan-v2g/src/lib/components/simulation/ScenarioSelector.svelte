<script lang="ts">
  import { simulation } from '$lib/stores/simulation';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  
  const scenarios = [
    { id: 'normal', name: 'Normal Day', description: 'Regular solar generation and grid pricing' },
    { id: 'cloudy', name: 'Cloudy Day', description: 'Reduced solar generation' },
    { id: 'peak', name: 'Peak Demand', description: 'High grid prices during peak hours' },
    { id: 'blackout', name: 'Grid Blackout', description: 'No grid power available' }
  ];
  
  function selectScenario(id: string): void {
    simulation.setScenario(id);
  }
</script>

<Card>
  <CardHeader>
    <CardTitle>Simulation Scenario</CardTitle>
  </CardHeader>
  <CardContent>
    <div class="space-y-2">
      {#each scenarios as scenario}
        <button 
          class="w-full text-left p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors
                 {$simulation.scenario === scenario.id ? 'bg-primary/10 border-primary' : ''}"
          on:click={() => selectScenario(scenario.id)}
        >
          <div class="font-medium">{scenario.name}</div>
          <div class="text-sm text-muted-foreground">{scenario.description}</div>
        </button>
      {/each}
    </div>
  </CardContent>
</Card>
