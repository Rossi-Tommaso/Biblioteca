<script>
  import PopUp from "../../componets/popUp.svelte";
  import Hamburger from "../../componets/hamburger.svelte";
  import SideBar from "../../componets/sideBar.svelte";
  import Loader from "../../componets/loader.svelte";
  import { user } from "../../stores/authStore";
  import { fetchDb, deleteOnDb } from "../../lib/db_scripts/db_functions";

  let popup = true;
  let sideBarVisible;
  let popupBook;
  let loading = true;
  let profilePhoto =
    user.photoURL ??
    "data:image/png;base64,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";

  const togglepopup = (book) => {
    popupBook = book;
    popup = !popup;
  };

  export let books = [];

  const getBooks = () => {
    loading = true;

    fetchDb("protectedData/books").then((data) => {
      books = data;
      loading = false;
    })
  };

  $: {
    books = fetchDb("protectedData/books").then((data) => {
      books = data;
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
    <PopUp bind:hidden={popup} bind:book={popupBook} bind:length={books.length} />
  {/if}

  <div class="top-actions">
    <button class="add-book-button" on:click={addBook}>➕ Aggiungi Libro</button
    >
    <div class="search-bar">
      <input type="text" placeholder="Cerca un libro..." />
    </div>
  </div>
  <div class="book-grid">
    {#if !loading}
      {#each books as book}
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
