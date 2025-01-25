<script>
  import PopUp from "../../componets/popUp.svelte";
  import Loader from "../../componets/loader.svelte";
  import { user, user_role } from "../../stores/authStore";
  import {
    fetchDb,
    deleteOnDb,
    getUserRole,
  } from "../../lib/db_scripts/db_functions";
  import { onMount } from "svelte";
  import { Plus, Search, BookOpen } from "lucide-svelte";
  import { biblioteca } from "../../stores/libStore";
  import { sidebarVisible } from "../../stores/utilsStore";
  import { toast } from "../../stores/utilsStore";


  onMount(async () => {
    sidebarVisible.set(false);
    user_role.set(
      await getUserRole($user.uid).then((data) => (userRole = data)),
    );
    profilePhoto = $user.photoURL ?? "/profile_placeholder.png";
    await fetchDb(`users/${$user.uid}/biblioteca`).then(async (lib) => {
      console.log("userLib:", lib);
      $biblioteca = lib;
      await getBooks(lib);
    });
  });

  let booksToUpdade = false; 
  let popup = true;
  let popupBook;
  let loading = true;
  let searchQuery = "";
  let books = [];
  let displayedBooks = [];
  let profilePhoto;
  let userRole;

  const togglepopup = (book) => {
    popupBook = book;
    popup = !popup;
  };

  const getBooks = async (lib) => {
    loading = true;
    await fetchDb(`protectedData/${lib}`).then((data) => {
      books = data;
      displayedBooks = data;
      loading = false;
    });
  };

  const addBook = () => {
    popup = !popup;
  };

  const editBook = (book) => {
    togglepopup(book);
  };

  const removeBook = async (book) => {
    try {
      loading = true;
      await deleteOnDb(`protectedData/${$biblioteca}/${book.id}`);
      await getBooks($biblioteca);
      toast('Book removed successfully', 'success');
    } catch (error) {
      toast('Failed to remove book', 'error');
      console.error(error);
    } finally {
      loading = false;
    }
  };

  $: userRole = $user_role;

  $: displayedBooks = searchQuery.trim()
    ? books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : books;

  $: {
  if ($biblioteca) {
    getBooks($biblioteca);
  }

  if (booksToUpdade) {
    getBooks($biblioteca);
    booksToUpdade = false;
  }
}
</script>

{#if userRole}
  <button class="add-book-button" on:click={addBook} aria-label="Add new book">
    <Plus size={24} />
  </button>
{/if}

<main class="content">
  {#if !popup}
    <PopUp
      bind:hidden={popup}
      bind:book={popupBook}
      bind:length={books.length}
      bind:update={booksToUpdade}
    />
  {/if}

  <div class="top-actions">
    <h1 class="page-title">Biblioteca:</h1>
    <h1 class="lib-title">{$biblioteca.replace('_', ' ')}</h1>
    <!-- <button>switch bookshelf</button> to implement -->
    <div class="search-bar">
      <Search size={20} />
      <input
        type="text"
        placeholder="Cerca libri..."
        bind:value={searchQuery}
        aria-label="Search books"
      />
    </div>
  </div>

  <div class="book-grid-container">
    {#if !loading}
      {#if displayedBooks.length > 0}
        <div class="book-grid">
          {#each displayedBooks as book}
            <article class="book-card">
              <div class="cover-container">
                <img
                  class="book-cover"
                  src={book.cover}
                  alt={`Cover of ${book.title}`}
                  loading="lazy"
                />
              </div>
              <div class="book-info">
                <h2 class="book-title">{book.title}</h2>
                <p class="book-author">by {book.author}</p>
              </div>
              {#if userRole}
                <div class="actions">
                  <button class="edit-button" on:click={() => editBook(book)}>
                    Modifica
                  </button>
                  <button
                    class="delete-button"
                    on:click={() => removeBook(book)}
                    aria-label={`Remove ${book.title}`}
                  >
                    Rimuovi
                  </button>
                </div>
              {/if}
            </article>
          {/each}
        </div>
      {:else}
        <div class="empty-state">
          <BookOpen size={48} />
          <p>No books found</p>
          <p class="empty-state-subtitle">
            Try adjusting your search or add new books
          </p>
        </div>
      {/if}
    {:else}
      <div class="loader-container">
        <Loader />
      </div>
    {/if}
  </div>
</main>

<style>
  main.content {
    max-width: 1440px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 100vh;
  }

  .page-title {
    font-size: 2rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0;
  }

  .top-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    gap: 2rem;
    position: relative;
    padding-bottom: 1rem;
  }

  .top-actions::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, #4f46e5, transparent);
  }

  .page-title {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(45deg, #4f46e5, #6366f1);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
    position: relative;
    letter-spacing: -0.5px;
  }

  .search-bar {
    display: flex;
    align-items: center;
    max-width: 400px;
    width: 100%;
    background-color: #fff;
    border-radius: 12px;
    padding: 0.75rem 1rem;
    gap: 0.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
  }

  .search-bar input {
    width: 100%;
    border: none;
    font-size: 1rem;
    background: transparent;
  }

  .search-bar input:focus {
    outline: none;
  }

  .book-grid-container {
    background-color: #f9fafb;
    border-radius: 16px;
    padding: 2rem;
    min-height: 70vh;
  }

  .book-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
  }

  .book-card {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .book-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  }

  .cover-container {
    position: relative;
    padding-top: 150%;
    background: #f3f4f6;
  }

  .book-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .book-info {
    padding: 1.5rem;
  }

  .book-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 0.5rem 0;
    line-height: 1.4;
  }

  .book-author {
    font-size: 0.975rem;
    color: #6b7280;
    margin: 0;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    padding: 0 1.5rem 1.5rem;
  }

  .actions button {
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .edit-button {
    background: #4f46e5;
    color: white;
    border: none;
  }

  .edit-button:hover {
    background: #4338ca;
  }

  .delete-button {
    background: #fff;
    color: #ef4444;
    border: 1px solid #ef4444;
  }

  .delete-button:hover {
    background: #ef4444;
    color: white;
  }

  .add-book-button {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: #4f46e5;
    color: white;
    width: 56px;
    height: 56px;
    border-radius: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 100;
  }

  .add-book-button:hover {
    transform: scale(1.05);
    width: 7.5%;
    box-shadow: 0 6px 16px rgba(79, 70, 229, 0.4);
  }

  .add-book-button:hover::after {
    content: "Aggiungi libro";
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    color: #6b7280;
    text-align: center;
  }

  .empty-state-subtitle {
    margin-top: 0.5rem;
    font-size: 0.875rem;
  }

  .loader-container {
    width: 100%;
    padding-top: 25dvh;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }


  @media (max-width: 768px) {
    .page-title {
      font-size: 2rem;
    }
    .top-actions {
      flex-direction: column;
      align-items: stretch;
    }

    .search-bar {
      max-width: none;
    }

    .book-grid {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 1rem;
    }
  }
</style>
