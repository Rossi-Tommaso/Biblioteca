<script>
  import SimpleLoader from "../../componets/simpleLoader.svelte";
  import SideBar from "../../componets/sideBar.svelte";
  import { sidebarVisible } from "../../stores/utilsStore";
  import { user } from "../../stores/authStore";
  import { fetchDb } from "../../lib/db_scripts/db_functions";
  import { onMount } from "svelte";
  import { base } from "$app/paths";
  import { Settings, Plus, Library, ArrowRightLeft } from "lucide-svelte";
  import { biblioteca } from "../../stores/libStore";
  import { isAdmin } from "../../lib/db_scripts/db_functions";
  //import { getPhotoFromSessionStorage } from "../../stores/authStore";

  let recentBooks = [];
  let loading = true;
  let userRole;
  let userLib = '';
  let stats = {
    totalBooks: 0,
    booksRead: 0,
    unread: 0,
  };

  onMount(async () => {
    userRole = await isAdmin($user.uid);
    userLib = await fetchDb(`users/${$user.uid}/biblioteca`).then(
      async (lib) => {
        console.log("userLib:", lib);
        $biblioteca = lib;
        await fetchDb("protectedData/books").then((data) => {
          console.log("DATAfrom db:", data);
          recentBooks = data.slice(0, 3);
          stats.totalBooks = data.length;
          stats.booksRead = data.filter((book) => book.read);
          stats.unread = data.filter((book) => !book.read).length;
          loading = false;
        });
      },
    );
  });

  const getCurrentTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buongiorno";
    if (hour < 18) return "Buon pomeriggio";
    return "Buonasera";
  };
</script>

<div class="content">
  <div class="welcome-section">
    <h2>{getCurrentTime()}, {$user?.displayName || "Lettore"}!</h2>
    <p>Benvenuto nella tua biblioteca personale</p>
  </div>

  {#if $biblioteca}
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Libri Totali</h3>
        <p class="stat-number">{stats.totalBooks}</p>
      </div>
      <div class="stat-card">
        <h3>Libri Letti</h3>
        <p class="stat-number">{stats.booksRead.length}</p>
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
          <SimpleLoader />
        {/if}
      </div>
    </div>

    <div class="quick-actions">
      <h2>Azioni Rapide</h2>
      <div class="actions-grid">
        <a href="{base}/biblioteca" class="action-card">
          <span class="icon"><Library /></span>
          <span class="text">Visualizza Biblioteca</span>
        </a>
        <a href="{base}/settings" class="action-card">
          <span class="icon"><Settings /></span>
          <span class="text">Impostazioni</span>
        </a>
        {#if userRole}
          <div class="action-card">
            <span class="icon"><ArrowRightLeft /></span>
            <span class="text">Cambia Biblioteca</span>
          </div>
          <div class="action-card">
            <span class="icon"><Plus /></span>
            <span class="text">Crea Nuova biblioteca</span>
          </div>
        {/if}
      </div>
    </div>

    {#if $sidebarVisible}
      <SideBar />
    {/if}
  {:else}
  <div class="unauthorized-container">
    <div class="unauthorized-content">
      <div class="icon-container">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon-unauthorized" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </div>
      <h3>Accesso non autorizzato</h3>
      <p>
        Non hai accesso a questa biblioteca. Per favore, contatta l'amministratore per richiedere la creazione di una nuova biblioteca {'('}nella mail <b>specifica il nome della biblioteca</b> che vuoi creare{')'}
      </p>
      <a href="mailto:adm.biblioteca.6a8e6.6809336095@gmail.com" class="contact-button">Contatta l'Amministratore</a>
    </div>
  </div>
  {/if}
</div>

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
    cursor: pointer;
  }

  .icon {
    font-size: 2rem;
  }

  .unauthorized-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
    text-align: center;
    background: #f8f9fa;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 40px;
  }

  .unauthorized-content {
    max-width: 600px;
  }

  .icon-container {
    margin-bottom: 20px;
  }

  .icon-unauthorized {
    width: 80px;
    height: 80px;
    color: #ff4d4d;
  }

  .unauthorized-content h3 {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 15px;
  }

  .unauthorized-content p {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 30px;
  }

  .contact-button {
    display: inline-block;
    background: linear-gradient(45deg, #ff4d4d, #ff8a65);
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-size: 1rem;
    font-weight: bold;
    transition: background 0.3s ease, transform 0.3s ease;
  }

  .contact-button:hover {
    background: linear-gradient(45deg, #ff8a65, #ff4d4d);
    transform: translateY(-2px);
  }

</style>
