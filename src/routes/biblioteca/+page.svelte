<script>
  import PopUp from "../../componets/popUp.svelte";
  import SideBar from "../../componets/sideBar.svelte";
  import { sidebarVisible } from "../../stores/utilsStore";
  import Loader from "../../componets/loader.svelte";
  import { user } from "../../stores/authStore";
  import { fetchDb, deleteOnDb, isAdmin } from "../../lib/db_scripts/db_functions";
  import { onMount } from "svelte";
  import { Plus, Search } from "lucide-svelte";
  import { biblioteca } from "../../stores/libStore";
  
  // import { getPhotoFromSessionStorage } from "../../stores/authStore";

  onMount(async () => {
    profilePhoto = $user.photoURL ?? "/profile_placeholder.png";
    userRole = await isAdmin($user.uid);
    userLib = await fetchDb(`users/${$user.uid}/biblioteca`).then(async (lib) => {
      console.log('userLib:', lib);
      $biblioteca = lib;
      getBooks(lib);
    });
  });

  let popup = true;
  let popupBook;
  let loading = true;
  let searchQuery = "";
  let books = [];
  let displayedBooks = [];
  let profilePhoto;
  let userRole;
  let userLib;

  const togglepopup = (book) => {
    popupBook = book;
    popup = !popup;
  };

  const getBooks = (lib) => {
    loading = true;
    fetchDb(`protectedData/${lib}`).then((data) => {
      books = data;
      displayedBooks = data;
      loading = false;
    });
  };

  $: {
    if(userLib) {
      fetchDb(`protectedData/$userLib}`).then((data) => {
        books = data;
        displayedBooks = data;
        loading = false;
      });
  }
  }

  const addBook = () => {
    popup = !popup;
  };

  const editBook = (book) => {
    togglepopup(book);
  };

  const removeBook = async (book) => {
    loading = true;
    console.log($biblioteca, book.id)
    await deleteOnDb(`protectedData/${$biblioteca}/${book.id}`).then(async () => {
      loading = false;
      getBooks($biblioteca);
    });
  };

  $: {
    if (searchQuery.trim() === "") {
      displayedBooks = books;
    } else {
      displayedBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
  }
</script>

{#if userRole}
<button class="add-book-button" on:click={addBook}><Plus size=40/> </button>
{/if}

<div class="content">
  {#if !popup}
    <PopUp
      bind:hidden={popup}
      bind:book={popupBook}
      bind:length={books.length}
    />
  {/if}

  <div class="top-actions">
    <div class="search-bar">
      <Search />
      <input
        type="text"
        placeholder="Cerca un libro..."
        bind:value={searchQuery}
      />
    </div>
  </div>

  <div class="book-grid">
    {#if !loading}
      {#if displayedBooks.length > 0}
        {#each displayedBooks as book}
          <div class="book-card">
            <div class="cover-container">
              <img
                class="book-cover"
                src={book.cover}
                alt={`Copertina di ${book.title}`}
              />
            </div>
            <div class="book-info">
              <p class="book-title">{book.title}</p>
              <p class="book-author">di {book.author}</p>
            </div>
            {#if userRole}
              <div class="actions">
                <button on:click={() => editBook(book)}>Modifica</button>
                <button on:click={() => removeBook(book)}>Rimuovi</button>
              </div>
            {/if}
          </div>
        {/each}
      {:else}
        <div class="no-books">
          <p>Nessun libro trovato</p>
        </div>
      {/if}
    {:else}
      <div class="loader-container">
        <Loader />
      </div>
    {/if}
  </div>
</div>

{#if $sidebarVisible}
  <SideBar />
{/if}

<!-- <style>
  :global(body) {
    margin: 0;
    font-family: "Poppins", sans-serif;
    background-color: #f8f9fa;
    color: #333;
    overflow: hidden;
  }

  .loader-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    max-width: 1200px;
    margin: 30px auto;
    padding: 20px;
  }

  .top-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .add-book-button {
    background: linear-gradient(45deg, #ff8a65, #6a11cb);
    position: fixed;
    bottom: 7.5vh;
    right: 22.5vw;
    color: #fff;
    border: none;
    border-radius: 100%;
    aspect-ratio: 1;
    padding: 1em;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    display: flex;
    align-items: center;
  }

  .add-book-button:hover {
    background: linear-gradient(45deg, #6a11cb, #ff8a65);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  .search-bar {
    flex-grow: 1;
    margin-left: 20px;
    position: relative;
  }
  .search-bar:first-child {
    display: inline;
    border: 1px solid red;
  }

  .search-bar input {
    width: 100%;
    padding: 10px 15px 10px 40px;
    border-radius: 20px;
    border: 1px solid #ddd;
    font-size: 1rem;
  }

  .search-bar:before {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    color: #aaa;
  }

  .book-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, 1fr);
    gap: 20px;
    overflow-y: scroll;
    height: 75dvh;
    background-color: #f0f0f5;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .book-grid::-webkit-scrollbar {
    width: 12px;
  }

  .book-grid::-webkit-scrollbar-track {
    background: #e0e0e0;
    border-radius: 6px;
  }

  .book-grid::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #6a11cb, #ff8a65);
    border-radius: 6px;
  }

  .book-grid::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #4e0d99, #d53747);
  }

  .book-card {
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .cover-container {
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .book-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .book-info {
    text-align: center;
    margin-bottom: 20px;
  }

  .book-title {
    font-size: 1.4rem;
    font-weight: bold;
    color: #333;
    margin: 0;
  }

  .book-author {
    font-size: 1rem;
    color: #666;
    margin: 5px 0 0;
  }

  .actions {
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  .actions button {
    flex: 1;
    background: #6a11cb;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition:
      background 0.2s ease,
      transform 0.2s ease;
  }

  .actions button:hover {
    background: #4e0d99;
    transform: scale(1.05);
  }

  .actions button:nth-child(2) {
    background: #ff4b5c;
  }

  .actions button:nth-child(2):hover {
    background: #d53747;
  }

  .no-books {
    text-align: center;
    font-size: 1.2rem;
    color: #666;
    margin-top: 20px;
  }
</style> -->

<style>
  :global(body) {
    margin: 0;
    font-family: "Poppins", sans-serif;
    background-color: #f8f9fa;
    color: #333;
    overflow: hidden;
  }

  .loader-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    max-width: 1200px;
    margin: 30px auto;
    padding: 20px;
  }

  .top-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .add-book-button {
    background: linear-gradient(45deg, #ff8a65, #6a11cb);
    position: fixed;
    bottom: 7.5vh;
    right: 22.5vw;
    color: #fff;
    border: none;
    border-radius: 100%;
    aspect-ratio: 1;
    padding: 1em;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
    display: flex;
    align-items: center;
  }

  .add-book-button:hover {
    background: linear-gradient(45deg, #6a11cb, #ff8a65);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  .search-bar {
    display: flex;
    align-items: center;
    position: relative;
    flex-grow: 1;
    margin-left: 20px;
    border-radius: 20px;
    border: 1px solid #ddd;
    background-color: #fff;
    height: 2.5rem;
    padding-left: 0.75%;
  }

  .search-bar input {
    width: 100%;
    padding-left: 1.25%;
    font-size: 1rem;
    border: 0;
  }

  .search-bar input:focus {
    outline: none;
    border-color: #6a11cb;
  }

  .search-bar .lucide-search {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    color: #aaa;
  }

  .book-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, 1fr);
    gap: 20px;
    overflow-y: scroll;
    height: 75dvh;
    background-color: #f0f0f5;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .book-grid::-webkit-scrollbar {
    width: 12px;
  }

  .book-grid::-webkit-scrollbar-track {
    background: #e0e0e0;
    border-radius: 6px;
  }

  .book-grid::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #6a11cb, #ff8a65);
    border-radius: 6px;
  }

  .book-grid::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #4e0d99, #d53747);
  }

  .book-card {
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .cover-container {
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 10px;
    margin-bottom: 20px;
  }

  .book-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .book-info {
    text-align: center;
    margin-bottom: 20px;
  }

  .book-title {
    font-size: 1.4rem;
    font-weight: bold;
    color: #333;
    margin: 0;
  }

  .book-author {
    font-size: 1rem;
    color: #666;
    margin: 5px 0 0;
  }

  .actions {
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  .actions button {
    flex: 1;
    background: #6a11cb;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition:
      background 0.2s ease,
      transform 0.2s ease;
  }

  .actions button:hover {
    background: #4e0d99;
    transform: scale(1.05);
  }

  .actions button:nth-child(2) {
    background: #ff4b5c;
  }

  .actions button:nth-child(2):hover {
    background: #d53747;
  }

  .no-books {
    text-align: center;
    font-size: 1.2rem;
    color: #666;
    margin-top: 20px;
  }
</style>