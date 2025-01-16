<script>
    import SimpleLoader from '../componets/simpleLoader.svelte';
    import { user } from '../stores/authStore';
    import Hamburger from '../componets/hamburger.svelte';
    import { page } from '$app/stores';
    import { base } from '$app/paths';
    import { logOut } from "../stores/authStore";
    
    let profilePhoto;
    let loading = true;

    $: profilePhoto = $user?.photoURL ?? `${base}/profile_placeholder.png`;
      
    $: hideHeader = $page?.route?.id === `/${base}/`;

    $: {
      if (!$user && $page?.route?.id === `/${base}/`){
        loading = false;
        console.log('CASE 1:', $user)
      } else if (!$user){
        loading = true;
        console.log('CASE 2:', $user)
      } else {
        loading = false;
      }
    };
      
</script>

{#if !hideHeader}
  <header>
      <div class="header">
          <Hamburger />
        
          <div class="header-left">
            <h1>La Mia Biblioteca</h1>
          </div>
          <div class="header-right">
            <img
              class="profile-img"
              src={profilePhoto}
              alt="profile-placeholder"
            >
          </div>
        </div>
</header>
{/if}	 

{#if !loading}
  <main>
      <slot />
  </main>
{:else}
<div class="center-VO loading">
  <SimpleLoader />
  <h2>Loading user data</h2>
  <button class="action-link" on:click={async () => await logOut()}>Esci</button>
</div>
{/if}


<style>
    :global(*) {
        margin: 0;
        padding: 0;
    }

    :global(.center-VO) {/*  orizontal and vertical center */        
        width: 100dvw;
        height: 100dvh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    header {
        width: 100vw;
    }

    .header {
      background: linear-gradient(90deg, #6a11cb, #ff8a65);
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 30px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
  
    .header-left h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
    }
  
    .header-right {
      display: flex;
      align-items: center;
    }
  
    .profile-img {
      background-size: cover;
      background-position: center;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      border: 2px solid #fff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .action-link {
      background: linear-gradient(45deg, #6a11cb, #ff8a65);
      color: #fff;
      padding: 10px 20px;
      border-radius: 8px;
      text-decoration: none;
      display: inline-block;
      font-size: 0.9rem;
      font-weight: bold;
      transition: background 0.3s ease;
    }
  
    .action-link:hover {
      background: linear-gradient(45deg, #ff8a65, #6a11cb);
    }

    .loading {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }
</style>