<script>
  import { logOut } from "../stores/authStore";
  import { base } from '$app/paths';
  import { Home, Book, Settings, LogOut  } from "lucide-svelte";
</script>

<div class="layout">
    <div class="sidebar visible">
      <div class="sidebar-header">
        <h2>Menu</h2>
      </div>
      <ul class="menu">
        <li><Home /><a href="{base}/home"> Home</a></li>
        <li><Book /><a href="{base}/biblioteca"> I miei libri</a></li>
        <li><Settings /><a href="{base}/settings"> Impostazioni</a></li>
        <li><LogOut /><a on:click={async () => await logOut()}> Logout</a></li>
      </ul>
    </div>
  </div>


  <style>
    .layout {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: -250px;
    width: 250px;
    height: 100%;
    background: linear-gradient(45deg, #6a11cb, #ff8a65);
    color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
    z-index: 10;
  }

  .sidebar.visible {
    left: 0;
  }

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .sidebar-header h2 {
    font-size: 2rem;
    margin: 0;
    margin-left: 25%;
  }

  .menu {
    list-style: none;
    padding: 10%;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .menu li {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
  }

  .menu a {
    text-decoration: none;
    color: white;
    padding: 10px 15px;
    border-radius: 8px;
    transition: background 0.3s ease-in-out;
    cursor: pointer;
  }

  .menu a:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  </style>