<script>
    import Hamburger from "../../componets/hamburger.svelte";
    import SideBar from "../../componets/sideBar.svelte";
    import { user } from "../../stores/authStore";
    import { fetchDb } from "../../lib/db_scripts/db_functions";
    import { onMount } from "svelte";
    import { base } from '$app/paths';
    //import { getPhotoFromSessionStorage } from "../../stores/authStore";

    
  
    let sideBarVisible;
    let recentBooks = [];
    let loading = true;
    let profilePhoto;
    

    let stats = {
      totalBooks: 0,
      booksRead: 0,
      unread: 0,
    };

    onMount(() => {
      profilePhoto = $user?.photoURL ?? "profile_placeholder.png";
      console.log(profilePhoto)
      fetchDb("protectedData/books").then((data) => {
        console.log("DATAfrom db:", data)
        recentBooks = data.slice(0, 3);
        stats.totalBooks = data.length;
        stats.booksRead = data.filter((book) => book.read).length;
        stats.unread = data.filter((book) => !book.read).length;
        loading = false;
      });
    });
  
    const getCurrentTime = () => {
      const hour = new Date().getHours();
      if (hour < 12) return "Buongiorno";
      if (hour < 18) return "Buon pomeriggio";
      return "Buonasera";
    };
  </script>
  
  <div class="header">
    <Hamburger bind:check={sideBarVisible} />
  
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
  
  <div class="content">
    <div class="welcome-section">
      <h2>{getCurrentTime()}, {$user?.displayName || 'Lettore'}!</h2>
      <p>Benvenuto nella tua biblioteca personale</p>
    </div>
  
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Libri Totali</h3>
        <p class="stat-number">{stats.totalBooks}</p>
      </div>
      <div class="stat-card">
        <h3>Libri Letti</h3>
        <p class="stat-number">{stats.booksRead}</p>
      </div>
      <div class="stat-card">
        <h3>Non letti</h3>
        <p class="stat-number">{stats.unread}</p>
      </div>
    </div>
  
    <div class="recent-books-section">
      <h2>Ultimi Libri Aggiunti</h2>
      <div class="recent-books-grid">
        {#if !loading && recentBooks.length > 0}
          {#each recentBooks as book}
            <div class="recent-book-card">
              <div class="book-cover-container">
                <img
                  class="book-cover"
                  src={book.cover}
                  alt={`Copertina di ${book.title}`}
                />
              </div>
              <div class="book-details">
                <h3>{book.title}</h3>
                <p class="author">di {book.author}</p>
              </div>
            </div>
          {/each}
        {:else if !loading}
          <p class="no-books">Nessun libro nella tua biblioteca</p>
        {:else}
          <div class="loader-container">
            <div class="loader"></div>
          </div>
        {/if}
      </div>
    </div>
  
    <div class="quick-actions">
      <h2>Azioni Rapide</h2>
      <div class="actions-grid">
        <a href="{base}/biblioteca" class="action-card">
          <span class="icon">📚</span>
          <span class="text">Visualizza Biblioteca</span>
        </a>
        <a href="{base}/biblioteca" class="action-card">
          <span class="icon">➕</span>
          <span class="text">Aggiungi Libro</span>
        </a>
        <a href="#" class="action-card">
          <span class="icon">👤</span>
          <span class="text">Profilo</span>
        </a>
      </div>
    </div>
  </div>
  
  {#if sideBarVisible}
    <SideBar />
  {/if}
  
  <style>
    .actions-grid {
      margin-top: 2.5%;
    }

    :global(body) {
      margin: 0;
      font-family: "Poppins", sans-serif;
      background-color: #f8f9fa;
      color: #333;
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
  
    .content {
      max-width: 1200px;
      margin: 30px auto;
      padding: 20px;
    }
  
    .welcome-section {
      text-align: center;
      margin-bottom: 40px;
    }
  
    .welcome-section h2 {
      font-size: 2.5rem;
      background: linear-gradient(45deg, #6a11cb, #ff8a65);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }
  
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
  
    .stat-card {
      background: #fff;
      border-radius: 15px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }
  
    .stat-card:hover {
      transform: translateY(-5px);
    }
  
    .stat-number {
      font-size: 2.5rem;
      font-weight: bold;
      background: linear-gradient(45deg, #6a11cb, #ff8a65);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  
    .stat-text {
      font-size: 1.5rem;
      color: #666;
    }
  
    .recent-books-section {
      margin-bottom: 40px;
    }
  
    .recent-books-section h2 {
      margin-bottom: 20px;
      color: #333;
    }
  
    .recent-books-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
  
    .recent-book-card {
      background: #fff;
      border-radius: 15px;
      padding: 20px;
      display: flex;
      gap: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }
  
    .recent-book-card:hover {
      transform: translateY(-5px);
    }
  
    .book-cover-container {
      width: 100px;
      height: 150px;
      overflow: hidden;
      border-radius: 10px;
    }
  
    .book-cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  
    .book-details {
      flex: 1;
    }
  
    .book-details h3 {
      margin: 0 0 10px 0;
      font-size: 1.2rem;
    }
  
    .author {
      color: #666;
      margin: 5px 0;
    }
  
    .added-date {
      font-size: 0.9rem;
      color: #999;
    }
  
    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
  
    .action-card {
      background: #fff;
      border-radius: 15px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
      text-decoration: none;
      color: #333;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
  
    .action-card:hover {
      transform: translateY(-5px);
      background: linear-gradient(45deg, #6a11cb, #ff8a65);
      color: #fff;
    }
  
    .icon {
      font-size: 2rem;
    }
  
    .loader-container {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 40px 0;
    }
  
    .loader {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #6a11cb;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  
    .no-books {
      text-align: center;
      color: #666;
      grid-column: 1 / -1;
      padding: 40px;
    }
  
    @media (max-width: 768px) {
      .welcome-section h2 {
        font-size: 2rem;
      }
  
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
  
      .recent-books-grid {
        grid-template-columns: 1fr;
      }
  
      .actions-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  </style>