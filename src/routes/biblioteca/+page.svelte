<script>
  import PopUp from "../../componets/popUp.svelte";
  import SideBar from "../../componets/sideBar.svelte";
  import { sidebarVisible } from "../../stores/utilsStore";
  import Loader from "../../componets/loader.svelte";
  import { user, user_role } from "../../stores/authStore";
  import { fetchDb, deleteOnDb } from "../../lib/db_scripts/db_functions";
  import { onMount } from "svelte";
  import { Plus, Search } from "lucide-svelte";
  import { biblioteca } from "../../stores/libStore";

  // import { getPhotoFromSessionStorage } from "../../stores/authStore";

  onMount(async () => {
    profilePhoto = $user.photoURL ?? "/profile_placeholder.png";
    userLib = await fetchDb(`users/${$user.uid}/biblioteca`).then(
      async (lib) => {
        console.log("userLib:", lib);
        $biblioteca = lib;
        getBooks(lib);
      },
    );
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
    if (userLib) {
      fetchDb(`protectedData/$userLib}`).then((data) => {
        books = data;
        displayedBooks = data;
        loading = false;
      });
    }
  }

  $: userRole = $user_role;

  const addBook = () => {
    popup = !popup;
  };

  const editBook = (book) => {
    togglepopup(book);
  };

  const removeBook = async (book) => {
    loading = true;
    console.log($biblioteca, book.id);
    await deleteOnDb(`protectedData/${$biblioteca}/${book.id}`).then(
      async () => {
        loading = false;
        getBooks($biblioteca);
      },
    );
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
    />
  {/if}

  <div class="top-actions">
    <h1 class="page-title">Library:</h1>
    <h1 class="lib-title">{userLib}</h1>
    <div class="search-bar">
      <Search size={20} />
      <input
        type="text"
        placeholder="Search books..."
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
                    Edit
                  </button>
                  <button
                    class="delete-button"
                    on:click={() => removeBook(book)}
                  >
                    Remove
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

{#if $sidebarVisible}
  <SideBar />
{/if}

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
