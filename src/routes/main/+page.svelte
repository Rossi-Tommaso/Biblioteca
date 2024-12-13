<script>
    export let books = [
        {title: 'book1', author: 'author1'}
    ];
  
    const addBook = () => {
        console.log(1)
        books = [...books, {title: 'book1', author: 'author1'}]
    };
  
    const editBook = (book) => {
      alert(`Modifica il libro: ${book.title}`);
    };
  
    const removeBook = (book) => {
      alert(`Rimuovi il libro: ${book.title}`);
    };
</script>
  
  <div class="header">
    <h1>La Mia Biblioteca</h1>
  </div>
  
  <div class="content">
    <div class="top-actions">
      <button class="add-book-button" on:click={addBook}>➕ Aggiungi Libro</button>
      <div class="search-bar">
        <input type="text" placeholder="Cerca un libro..." />
      </div>
    </div>
  
    {#if books.length > 0}
      <div class="book-grid">
        {#each books as book}
          <div class="book-card">
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
      </div>
    {:else}
      <p class="no-books">Nessun libro presente. Aggiungine uno per iniziare!</p>
    {/if}
  </div>
  
  <style>
    :global(body) {
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background-color: #f8f9fa;
      color: #333;
    }
  
    .header {
      background: linear-gradient(90deg, #e66465, #9198e5);
      color: #fff;
      padding: 20px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  
    .header h1 {
      margin: 0;
      font-size: 2.5rem;
      font-weight: 700;
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
      background: #6a11cb;
      color: #fff;
      border: none;
      border-radius: 30px;
      padding: 12px 25px;
      font-size: 1.2rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(106, 17, 203, 0.2);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
  
    .add-book-button:hover {
      box-shadow: 0 6px 12px rgba(106, 17, 203, 0.3);
    }
  
    .search-bar {
      flex-grow: 1;
      margin-left: 20px;
    }
  
    .search-bar input {
      width: 100%;
      padding: 10px 15px;
      border-radius: 20px;
      border: 1px solid #ddd;
      font-size: 1rem;
    }
  
    .book-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }
  
    .book-card {
      background: #fff;
      border-radius: 15px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
  
    .book-card:hover {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
  
    .book-info {
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
      background: #9198e5;
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 10px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s ease, transform 0.2s ease;
    }
  
    .actions button:hover {
      transform: scale(1.0125);
    }
  
    .actions button:nth-child(2) {
      background: #ff4b5c;
    }

  
    .no-books {
      text-align: center;
      font-size: 1.2rem;
      color: #666;
      margin-top: 20px;
    }
  </style>
  