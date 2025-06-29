<script lang="ts">
  import { onMount } from 'svelte';
  import { simulation, formattedTime } from '$lib/stores/simulation';
  import { tricycles } from '$lib/stores/tricycles';
  import { terminalStats } from '$lib/stores/energy';
  import { connectWebSocket } from '$lib/stores/websocket';
  
  import TerminalStatus from '$lib/components/dashboard/TerminalStatus.svelte';
  import TricycleGrid from '$lib/components/dashboard/TricycleGrid.svelte';
  import CommunityStats from '$lib/components/dashboard/CommunityStats.svelte';
  import TimeControls from '$lib/components/simulation/TimeControls.svelte';
  import ScenarioSelector from '$lib/components/simulation/ScenarioSelector.svelte';
  import SolarGenerationChart from '$lib/components/dashboard/SolarGenerationChart.svelte';
  import GridPriceChart from '$lib/components/dashboard/GridPriceChart.svelte';
  import TokenFlowChart from '$lib/components/dashboard/TokenFlowChart.svelte';
  import Leaderboard from '$lib/components/dashboard/Leaderboard.svelte';
  
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Progress } from '$lib/components/ui/progress';
  import { 
    Sun, 
    Zap, 
    TrendingUp, 
    TrendingDown,
    Battery,
    Coins,
    BarChart3,
    Trophy,
    Users,
    Activity
  } from 'lucide-svelte';
  
  // Track the active tab
  let activeTab = 'overview';
  
  // Handle tab change
  function handleTabChange(value: string | undefined) {
    if (value) {
      activeTab = value;
    }
  }
  
  onMount(() => {
    connectWebSocket();
  });
  
  // Derived values
  $: solarPercentage = $terminalStats.solarGeneration / 200 * 100;
  $: priceIndicator = $terminalStats.gridPrice > 7 ? 'high' : 'normal';
</script>

<div style="min-height: 100vh; background-color: #f8fafc;">
  <!-- Header -->
  <header class="dashboard-header">
    <div class="container">
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 1rem;">
        <!-- Logo and Title -->
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="height: 2.5rem; width: 2.5rem; border-radius: 9999px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.2);">
            <Sun class="h-6 w-6" />
          </div>
          <div>
            <h1 style="font-size: 1.5rem; font-weight: 700;">Solaranihan</h1>
            <p style="font-size: 0.75rem; color: #d1fae5;">V2G Energy Management System</p>
          </div>
        </div>
        
        <!-- Time and Controls -->
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="border: 1px solid rgba(255,255,255,0.3); border-radius: 0.25rem; padding: 0.25rem 0.5rem; font-size: 0.875rem;">
            {$formattedTime}
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; border-radius: 0.5rem; border: 1px solid rgba(255,255,255,0.2);">
            <TimeControls />
            <div style="height: 1.5rem; width: 1px; background-color: rgba(255,255,255,0.2);"></div>
            <ScenarioSelector />
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main style="max-width: 1200px; margin: 0 auto; padding: 2rem 1rem;">
    <!-- Energy Overview Section -->
    <section style="margin-bottom: 2rem;">
      <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
        <Zap class="h-5 w-5" style="color: #059669;" />
        Energy Overview
      </h2>
      
      <!-- Solar Generation Card (Full Width) -->
      <div style="background: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); padding: 1rem; margin-bottom: 1rem;">
        <div style="padding-bottom: 0.75rem;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <div style="height: 2rem; width: 2rem; display: flex; align-items: center; justify-content: center;">
                <Sun class="h-5 w-5" style="color: #f59e0b;" />
              </div>
              <div>
                <h3 style="font-weight: 500;">Solar Generation</h3>
                <p style="font-size: 0.875rem; color: #6b7280;">Current output</p>
              </div>
            </div>
            <div style="margin-left: auto; font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 9999px; background-color: ${solarPercentage > 50 ? '#10b981' : '#6b7280'}; color: white;">
              {solarPercentage > 50 ? 'High' : 'Moderate'}
            </div>
          </div>
        </div>
        <div style="height: 0.5rem; background-color: #e2e8f0; border-radius: 9999px; margin-top: 0.5rem;">
          <div style="height: 100%; background-color: #f59e0b; border-radius: 9999px; width: {solarPercentage}%;"></div>
        </div>
        <p class="text-xs mt-2" style="color: #64748b;">{solarPercentage.toFixed(0)}% of capacity</p>
      </div>
      
      <!-- Score Card Row -->
      <div style="margin-top: 1.5rem; padding: 0; display: flex; gap: 1rem;">
        <!-- Grid Price Score Card -->
        <div class="dashboard-card" style="flex: 1; padding: 0; overflow: hidden; position: relative; border-top: 4px solid #3b82f6;">
          <div style="position: absolute; top: 0; right: 0; font-size: 0.75rem; padding: 0.25rem 0.75rem; border-bottom-left-radius: 0.5rem; background-color: {priceIndicator === 'high' ? '#fee2e2' : '#f1f5f9'}; color: {priceIndicator === 'high' ? '#ef4444' : '#64748b'};">
            {priceIndicator === 'high' ? 'High' : 'Normal'}
          </div>
          
          <div style="padding: 1.5rem; display: flex; flex-direction: column; min-height: 220px;">
            <div class="flex items-center gap-3">
              <div class="h-12 w-12 flex items-center justify-center rounded-full" style="background-color: rgba(59, 130, 246, 0.1);">
                <Activity class="h-7 w-7" style="color: #3b82f6;" />
              </div>
              <h3 class="text-base font-medium">Grid Price</h3>
            </div>
            
            <div class="flex-grow flex flex-col justify-center" style="margin-top: 1rem;">
              <div style="font-size: 4.5rem; line-height: 1; font-weight: 800; text-align: center; color: #3b82f6; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                ₱{$terminalStats.gridPrice.toFixed(2)}
              </div>
              <div class="text-base text-center mt-2" style="color: #64748b;">/kWh</div>
              
              <div class="flex items-center justify-center gap-2 mt-4 text-xs">
                {#if priceIndicator === 'high'}
                  <div class="flex items-center justify-center px-2 py-1 rounded-full" style="background-color: rgba(239, 68, 68, 0.1);">
                    <TrendingUp class="h-3 w-3 mr-1" style="color: #ef4444;" />
                    <span style="color: #ef4444;">Peak pricing active</span>
                  </div>
                {:else}
                  <div class="flex items-center justify-center px-2 py-1 rounded-full" style="background-color: rgba(16, 185, 129, 0.1);">
                    <TrendingDown class="h-3 w-3 mr-1" style="color: #10b981;" />
                    <span style="color: #10b981;">Off-peak rates</span>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Battery Capacity Score Card -->
        <div class="dashboard-card" style="flex: 1; padding: 0; overflow: hidden; position: relative; border-top: 4px solid #10b981;">
          <div style="padding: 1.5rem; display: flex; flex-direction: column; min-height: 220px;">
            <div class="flex items-center gap-3">
              <div class="h-12 w-12 flex items-center justify-center rounded-full" style="background-color: rgba(16, 185, 129, 0.1);">
                <Battery class="h-7 w-7" style="color: #10b981;" />
              </div>
              <h3 class="text-base font-medium">Available Battery</h3>
            </div>
            
            <div class="flex-grow flex flex-col justify-center" style="margin-top: 1rem;">
              <div style="font-size: 4.5rem; line-height: 1; font-weight: 800; text-align: center; color: #10b981; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                {$terminalStats.availableBatteryCapacity.toFixed(0)}
              </div>
              <div class="text-base text-center mt-2" style="color: #64748b;">kWh</div>
              
              <div style="height: 0.5rem; background-color: #e2e8f0; border-radius: 9999px; margin: 1rem auto; width: 80%;">
                <div style="height: 100%; background-color: #10b981; border-radius: 9999px; width: {$terminalStats.availableBatteryCapacity / $terminalStats.totalBatteryCapacity * 100}%;"></div>
              </div>
              <p class="text-xs text-center" style="color: #64748b;">of {$terminalStats.totalBatteryCapacity} kWh total</p>
            </div>
          </div>
        </div>
        
        <!-- Community Earnings Score Card -->
        <div class="dashboard-card" style="flex: 1; padding: 0; overflow: hidden; position: relative; border-top: 4px solid #8b5cf6;">
          <div style="padding: 1.5rem; display: flex; flex-direction: column; min-height: 220px;">
            <div class="flex items-center gap-3">
              <div class="h-12 w-12 flex items-center justify-center rounded-full" style="background-color: rgba(139, 92, 246, 0.1);">
                <Coins class="h-7 w-7" style="color: #8b5cf6;" />
              </div>
              <h3 class="text-base font-medium">Community Earnings</h3>
            </div>
            
            <div class="flex-grow flex flex-col justify-center" style="margin-top: 1rem;">
              <div style="font-size: 4.5rem; line-height: 1; font-weight: 800; text-align: center; color: #8b5cf6; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                ₱{$terminalStats.communityEarnings.toFixed(0)}
              </div>
              
              <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1rem;">
                <div class="flex items-center justify-center px-2 py-1 rounded-full" style="background-color: rgba(16, 185, 129, 0.1); font-size: 0.75rem;">
                  <TrendingUp class="h-3 w-3 mr-1" style="color: #10b981;" />
                  <span style="color: #10b981;">+{$terminalStats.tokensMinted} ARAW</span>
                </div>
                <div class="flex items-center justify-center px-2 py-1 rounded-full" style="background-color: rgba(249, 115, 22, 0.1); font-size: 0.75rem;">
                  <TrendingDown class="h-3 w-3 mr-1" style="color: #f97316;" />
                  <span style="color: #f97316;">-{$terminalStats.tokensBurned} ARAW</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Dashboard Tabs -->
    <section>
      <div class="w-full">
        <div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-bottom: 1rem;">
            <div style="display: flex; border: 1px solid #e2e8f0; border-radius: 0.5rem; overflow: hidden;">
              <button 
                on:click={() => handleTabChange('overview')} 
                style="flex: 1; padding: 0.75rem; text-align: center; background-color: {activeTab === 'overview' ? '#0ea5e9' : '#f8fafc'}; color: {activeTab === 'overview' ? 'white' : '#64748b'}; font-weight: {activeTab === 'overview' ? '600' : '400'}; border: none; cursor: pointer;"
              >
                <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                  <BarChart3 class="h-4 w-4" />
                  Fleet Overview
                </div>
              </button>
              <button 
                on:click={() => handleTabChange('analytics')} 
                style="flex: 1; padding: 0.75rem; text-align: center; background-color: {activeTab === 'analytics' ? '#0ea5e9' : '#f8fafc'}; color: {activeTab === 'analytics' ? 'white' : '#64748b'}; font-weight: {activeTab === 'analytics' ? '600' : '400'}; border: none; cursor: pointer;"
              >
                <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                  <Activity class="h-4 w-4" />
                  Analytics
                </div>
              </button>
              <button 
                on:click={() => handleTabChange('leaderboard')} 
                style="flex: 1; padding: 0.75rem; text-align: center; background-color: {activeTab === 'leaderboard' ? '#0ea5e9' : '#f8fafc'}; color: {activeTab === 'leaderboard' ? 'white' : '#64748b'}; font-weight: {activeTab === 'leaderboard' ? '600' : '400'}; border: none; cursor: pointer;"
              >
                <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                  <Trophy class="h-4 w-4" />
                  Leaderboard
                </div>
              </button>
            </div>
          </div>
          
          <div class="mt-6">
            {#if activeTab === 'overview'}
              <div class="dashboard-card">
                <div class="pb-3">
                  <h3 class="text-lg font-medium">Tricycle Fleet Status</h3>
                </div>
                <div>
                  <TricycleGrid />
                </div>
              </div>
            {/if}
            
            {#if activeTab === 'analytics'}
              <div class="space-y-6">
                <div style="display: grid; gap: 1.5rem; grid-template-columns: repeat(1, 1fr); margin-bottom: 1.5rem;">
                  <div class="dashboard-card">
                    <div class="pb-3">
                      <div class="flex items-center gap-2">
                        <Sun class="h-5 w-5" style="color: #f59e0b;" />
                        <h3 class="text-lg font-medium">Solar Generation</h3>
                      </div>
                    </div>
                    <div>
                      <SolarGenerationChart />
                    </div>
                  </div>
                  
                  <div class="dashboard-card">
                    <div class="pb-3">
                      <div class="flex items-center gap-2">
                        <Zap class="h-5 w-5" style="color: #3b82f6;" />
                        <h3 class="text-lg font-medium">Grid Price</h3>
                      </div>
                    </div>
                    <div>
                      <GridPriceChart />
                    </div>
                  </div>
                </div>
                
                <div class="dashboard-card">
                  <div class="pb-3">
                    <div class="flex items-center gap-2">
                      <Coins class="h-5 w-5" style="color: #8b5cf6;" />
                      <h3 class="text-lg font-medium">Token Flow</h3>
                    </div>
                  </div>
                  <div>
                    <TokenFlowChart />
                  </div>
                </div>
              </div>
            {/if}
            
            {#if activeTab === 'leaderboard'}
              <div class="dashboard-card">
                <div class="pb-3">
                  <div class="flex items-center gap-2">
                    <Trophy class="h-5 w-5" style="color: #f59e0b;" />
                    <h3 class="text-lg font-medium">Top Performers</h3>
                  </div>
                </div>
                <div>
                  <Leaderboard />
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </section>

    <!-- Community Statistics -->
    <section class="mt-8">
      <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
        <Users class="h-5 w-5 text-indigo-600" />
        Community Statistics
      </h2>
      <Card>
        <CardContent class="pt-6">
          <CommunityStats />
        </CardContent>
      </Card>
    </section>
  </main>

  <!-- Footer -->
  <footer class="dashboard-footer">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <div class="flex items-center gap-2">
            <span class="font-bold">©</span>
            <span class="font-bold">Solaranihan V2G</span>
          </div>
          <p class="text-xs mt-1">Empowering communities through renewable energy</p>
        </div>
        <div class="text-center md:text-right">
          <p class="text-sm">© 2025 Solaranihan V2G Simulation Platform</p>
          <p class="text-xs mt-1 text-slate-400">Powered by Renewable Energy</p>
        </div>
      </div>
    </div>
  </footer>
</div>

<!-- Removed style tag to fix preflight CSS error -->