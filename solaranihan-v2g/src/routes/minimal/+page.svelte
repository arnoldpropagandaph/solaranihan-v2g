<script lang="ts">
  // Simple standalone dashboard with no external dependencies
  import { onMount } from 'svelte';
  
  // Mock data
  let solarGeneration = 120;
  let gridPrice = 8.5;
  let batteryLevel = 75;
  let tokenBalance = 250;
  let currentTime = new Date().toLocaleTimeString();
  
  // Derived values
  $: solarPercentage = (solarGeneration / 200) * 100;
  $: priceIndicator = gridPrice > 7 ? 'high' : 'normal';
  
  onMount(() => {
    console.log('Minimal dashboard mounted');
    
    // Update time
    const timeInterval = setInterval(() => {
      currentTime = new Date().toLocaleTimeString();
    }, 1000);
    
    // Simulate data updates
    const dataInterval = setInterval(() => {
      solarGeneration = Math.max(50, Math.min(200, solarGeneration + (Math.random() * 20 - 10)));
      gridPrice = Math.max(5, Math.min(12, gridPrice + (Math.random() * 0.5 - 0.25)));
      batteryLevel = Math.max(10, Math.min(100, batteryLevel + (Math.random() * 5 - 2.5)));
      tokenBalance += Math.random() > 0.5 ? 5 : -2;
    }, 3000);
    
    return () => {
      clearInterval(timeInterval);
      clearInterval(dataInterval);
    };
  });
</script>

<div>
  <header>
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <div class="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </div>
          <div>
            <h1>Solaranihan</h1>
            <p>V2G Energy Management System</p>
          </div>
        </div>
        
        <div class="time-display">
          <span>{currentTime}</span>
        </div>
      </div>
    </div>
  </header>

  <main>
    <div class="container">
      <section>
        <h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          Energy Overview
        </h2>
        
        <div class="card-grid">
          <!-- Solar Generation Card -->
          <div class="card">
            <div class="card-header">
              <div class="card-icon solar">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              </div>
              <div class="card-title">
                <h3>Solar Generation</h3>
                <p>Current output</p>
              </div>
              <div class="badge" class:success={solarPercentage > 50}>
                {solarPercentage > 50 ? 'High' : 'Moderate'}
              </div>
            </div>
            
            <div class="card-content">
              <div class="value">{solarGeneration.toFixed(1)} <span class="unit">kW</span></div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: {solarPercentage}%;"></div>
              </div>
              <p class="progress-text">{solarPercentage.toFixed(0)}% of capacity</p>
            </div>
          </div>
          
          <!-- Grid Price Card -->
          <div class="card">
            <div class="card-header">
              <div class="card-icon grid">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div class="card-title">
                <h3>Grid Price</h3>
                <p>Current rate</p>
              </div>
              <div class="badge" class:warning={priceIndicator === 'high'}>
                {priceIndicator === 'high' ? 'High' : 'Normal'}
              </div>
            </div>
            
            <div class="card-content">
              <div class="value">{gridPrice.toFixed(2)} <span class="unit">₱/kWh</span></div>
              <div class="trend" class:up={priceIndicator === 'high'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
                <span>{priceIndicator === 'high' ? '+12%' : '-3%'} from average</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</div>

<style>
  /* Reset and base styles */
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.5;
    color: #334155;
    background-color: #f8fafc;
  }
  
  /* Layout */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Header */
  header {
    background-color: #0ea5e9;
    color: white;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .header-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  
  @media (min-width: 768px) {
    .header-content {
      flex-direction: row;
    }
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .logo-icon {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255,255,255,0.2);
  }
  
  .logo h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }
  
  .logo p {
    font-size: 0.75rem;
    color: #d1fae5;
    margin: 0;
  }
  
  .time-display {
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
  }
  
  /* Main content */
  main {
    padding: 2rem 0;
  }
  
  section {
    margin-bottom: 2rem;
  }
  
  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #1e293b;
  }
  
  h2 svg {
    color: #059669;
  }
  
  /* Card grid */
  .card-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(1, 1fr);
  }
  
  @media (min-width: 640px) {
    .card-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  /* Cards */
  .card {
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }
  
  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .card-icon {
    height: 2rem;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    margin-right: 0.75rem;
  }
  
  .card-icon.solar {
    color: #f59e0b;
  }
  
  .card-icon.grid {
    color: #6366f1;
  }
  
  .card-title {
    flex: 1;
  }
  
  .card-title h3 {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0;
    color: #1e293b;
  }
  
  .card-title p {
    font-size: 0.75rem;
    color: #64748b;
    margin: 0;
  }
  
  .badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    background-color: #6b7280;
    color: white;
  }
  
  .badge.success {
    background-color: #10b981;
  }
  
  .badge.warning {
    background-color: #f59e0b;
  }
  
  /* Card content */
  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .value {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #1e293b;
  }
  
  .unit {
    font-size: 0.875rem;
    font-weight: 400;
    color: #64748b;
  }
  
  .progress-bar {
    height: 0.5rem;
    background-color: #e2e8f0;
    border-radius: 9999px;
    margin-bottom: 0.5rem;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background-color: #f59e0b;
    border-radius: 9999px;
  }
  
  .progress-text {
    font-size: 0.75rem;
    color: #64748b;
    margin: 0;
  }
  
  .trend {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: #10b981;
  }
  
  .trend.up {
    color: #ef4444;
  }
</style>
