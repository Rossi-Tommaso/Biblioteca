<script>
  import SimpleLoader from "../componets/simpleLoader.svelte";
  import Hamburger from "../componets/hamburger.svelte";
  import SideBar from "../componets/sideBar.svelte";
  import { sidebarVisible } from "../stores/utilsStore";
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  import { logOut } from "../stores/authStore";
  import { goto } from "$app/navigation";
  import { user } from "../stores/authStore";
  import { fade } from "svelte/transition";
  import { toasts } from "../stores/utilsStore";

  let profilePhoto;
  let loading = true;

  $: profilePhoto = $user?.photoURL ?? `${base}/profile_placeholder.png`;

  $: hideHeader = $page?.route?.id === `/`; //in production $page.ruote.id does not need base

  $: {
    if (!$user && $page?.route?.id === `/`) {
      loading = false;
      console.log("CASE 1:", $user);
    } else if (!$user) {
      loading = true;
      console.log("CASE 2:", $user);
    } else {
      loading = false;
    }
  }
</script>

{#if $toasts.length}
  <div class="toast-container">
    {#each $toasts as toast (toast.id)}
      <div class="toast {toast.type}">{toast.message}</div>
    {/each}
  </div>
{/if}

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
          on:click={() => goto("/settings")}
        />
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
    <button class="action-link" on:click={async () => await logOut()}
      >Esci</button
    >
  </div>
{/if}

{#if $sidebarVisible}
<div class="sidebar-transition" transition:fade>
  <SideBar />
</div>
{/if}

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    border: 0;
  }

  :global(body) {
    margin: 0;
    font-family: "Poppins", sans-serif;
    background-color: #f8f9fa;
    color: #333;
  }

  :global(body::-webkit-scrollbar) {
    width: 0;
  }

  :global(.center-VO) {
    /*  orizontal and vertical center */
    width: 100dvw;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .toast-container {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 1000;
  }

  .toast {
    padding: 0.75rem 1.5rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    color: white;
    opacity: 0.9;
  }
  .success {
    background-color: #48bb78;
  }
  .error {
    background-color: #f56565;
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
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .profile-img:hover {
    transform: scale(1.05);
    cursor: pointer;
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
  
  .sidebar-transition {
    height: 100dvh;
  }
</style>
