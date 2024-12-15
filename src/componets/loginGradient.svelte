<svg 
  class="absolute inset-0 w-full h-full -z-10" 
  viewBox="0 0 1440 900" 
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- Sfondo sfumato scuro -->
  <defs>
    <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#121212" stop-opacity="1" />
      <stop offset="100%" stop-color="#1e1e1e" stop-opacity="1" />
    </linearGradient>
  </defs>
  
  <!-- Rettangolo di sfondo -->
  <rect width="1440" height="900" fill="url(#darkGradient)" />
  
  <!-- Particelle dinamiche -->
  {#each Array(50).fill(0) as _, i}
    {@const x = Math.random() * 1440}
    {@const y = Math.random() * 900}
    {@const size = Math.random() * 3 + 1}
    {@const opacity = Math.random() * 0.7 + 0.3}
    {@const duration = Math.random() * 5 + 3}
    
    <circle 
      cx={x} 
      cy={y} 
      r={size} 
      fill="#4a4a4a"
      fill-opacity={opacity}
    >
      <animate
        attributeName="cy"
        values={`${y};${y-50};${y}`}
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values={`${opacity};${opacity*0.5};${opacity}`}
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
    </circle>
  {/each}
  
  <!-- Bagliori intermittenti -->
  <rect 
    width="1440" 
    height="900" 
    fill="rgba(30, 30, 50, 0.1)"
  >
    <animate
      attributeName="opacity"
      values="0.1;0.3;0.1"
      dur="7s"
      repeatCount="indefinite"
    />
  </rect>
</svg>

<style>
  svg {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -10;
  }
</style>