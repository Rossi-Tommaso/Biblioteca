<script>
  import PopUp from "../../componets/popUp.svelte";
  import Hamburger from "../../componets/hamburger.svelte";
  import SideBar from "../../componets/sideBar.svelte";
  import Loader from "../../componets/loader.svelte";
  import { user } from "../../stores/authStore";
  import { fetchDb, deleteOnDb } from "../../lib/db_scripts/db_functions";
  import { onMount } from "svelte";
  
  // import { getPhotoFromSessionStorage } from "../../stores/authStore";

  onMount(() => {
    getBooks();
    profilePhoto = $user.photoURL ??
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAACoqKj8/PwEBAT5+fn29vbl5eXz8/O1tbV1dXXY2NhTU1MiIiLp6enh4eHFxcVtbW2dnZ3Ozs4uLi43NzcbGxtJSUmXl5eRkZGJiYmsrKx5eXnR0dFCQkJXV1eBgYEQEBAnJydmZmYcHBy7u7vQ67L1AAAFXUlEVORw5CYII=";

  });

  let popup = true;
  let sideBarVisible;
  let popupBook;
  let loading = true;
  let searchQuery = "";
  let books = [];
  let displayedBooks = [];
  let profilePhoto;

  const togglepopup = (book) => {
    popupBook = book;
    popup = !popup;
  };

  const getBooks = () => {
    loading = true;
    fetchDb("protectedData/books").then((data) => {
      books = data;
      displayedBooks = data;
      loading = false;
    });
  };

  $: {
    fetchDb("protectedData/books").then((data) => {
      books = data;
      displayedBooks = data;
      loading = false;
    });
  }

  const addBook = () => {
    popup = !popup;
  };

  const editBook = (book) => {
    togglepopup(book);
  };

  const removeBook = (book) => {
    loading = true;
    deleteOnDb(`protectedData/books/${book.id}`).then(() => {
      loading = false;
      getBooks();
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

<div class="header">
  <Hamburger bind:check={sideBarVisible} />

  <div class="header-left">
    <h1>La Mia Biblioteca</h1>
  </div>
  <div class="header-right">
    <div
      class="profile-img"
      style="background-image: url({profilePhoto});"
    ></div>
  </div>
</div>

<div class="content">
  {#if !popup}
    <PopUp
      bind:hidden={popup}
      bind:book={popupBook}
      bind:length={books.length}
    />
  {/if}

  <div class="top-actions">
    <button class="add-book-button" on:click={addBook}>➕ Aggiungi Libro</button
    >
    <div class="search-bar">
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
            <div class="actions">
              <button on:click={() => editBook(book)}>Modifica</button>
              <button on:click={() => removeBook(book)}>Rimuovi</button>
            </div>
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

{#if sideBarVisible}
  <SideBar />
{/if}

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
    cursor: pointer;
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
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
    color: #fff;
    border: none;
    border-radius: 30px;
    padding: 12px 25px;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .add-book-button:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  .search-bar {
    flex-grow: 1;
    margin-left: 20px;
    position: relative;
  }

  .search-bar input {
    width: 100%;
    padding: 10px 15px 10px 40px;
    border-radius: 20px;
    border: 1px solid #ddd;
    font-size: 1rem;
  }

  .search-bar:before {
    content: "🔍";
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
