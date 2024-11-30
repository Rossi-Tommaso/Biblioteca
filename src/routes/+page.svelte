<script>
    import { onMount } from 'svelte';
    import { db } from './lib/firebase.config';
    import {set, get, ref, remove} from 'firebase/database'

    let books = [];
    let newBook = { author: '', title: '', edition: '', comments: '', read: false, loaned: false };

    onMount (
      getDb()
     )

    async function getDb() {
        const dbRef = ref(db, 'books/')

        try {
          const snapshot = await get(dbRef);

          if(snapshot.exists())
            books = Object.values(snapshot.val());
          else
            books = [];
        }
        catch (e) {
          console.error('Errore nel caricamento del database:', e);
        }
      }

    async function addToDb(book) {
        console.log(book)
        const booksRef = ref(db, 'books/');
        try {
            const snapshot = await get(booksRef);
            const books = snapshot.exists ? snapshot.val() : {};
            const newId = Object.keys(books).length + 1;
            
            await set(ref(db, `books/book${newId}`), {
            id: newId,
            author: book.author,
            title: book.title,
            edition: book.edition,
            read: book.read,
            loaned: book.loaned
            }
        )
        console.log('Libro salvato con successo!');
        }
        catch (e) {
            console.error('Errore nel salvataggio del libro:', e);
        }
    }   

    const addNewBook = () => {
      books = [...books, { ...newBook, id: Date.now() }];
      addToDb(newBook)
      newBook = { author: '', title: '', edition: '', comments: '', read: false, loaned: false };
    };
  
    async function removeBook(id) {
    const bookRef = ref(db, `books/book${id}`); // Percorso esatto del libro
    try {
        await remove(bookRef);
        books = books.filter(book => book.id !== id); // Aggiorna la lista locale
        console.log('Libro rimosso con successo!');
    } catch (e) {
        console.error('Errore nella rimozione del libro:', e);
    }
}

  </script>
  
  <h1>Gestione Biblioteca</h1>
  
  <section>
    <h2>Aggiungi un nuovo libro</h2>
    <form on:submit|preventDefault={addNewBook}>
      <input type="text" bind:value={newBook.author} placeholder="Autore" required />
      <input type="text" bind:value={newBook.title} placeholder="Titolo" required />
      <input type="text" bind:value={newBook.edition} placeholder="Edizione" />
      <textarea bind:value={newBook.comments} placeholder="Commenti"></textarea>
      <label>
        Letto: <input type="checkbox" bind:checked={newBook.read} />
      </label>
      <label>
        Prestato: <input type="checkbox" bind:checked={newBook.loaned} />
      </label>
      <button type="submit">Aggiungi</button>
    </form>
  </section>
  
  <section>
    <h2>Lista Libri</h2>
    {#if books.length === 0}
      <p>Non ci sono libri nella tua biblioteca.</p>
    {/if}
    <ul>
      {#each books as book (book.id)}
        <li>
          <strong>{book.title}</strong> di {book.author} 
          <button on:click={() => removeBook(book.id)}>Rimuovi</button>
        </li>
      {/each}
    </ul>
  </section>
  
  <style>
    h1 {
      font-family: Arial, sans-serif;
      margin-bottom: 20px;
    }
    form {
      margin-bottom: 30px;
    }
    input, textarea, button {
      margin: 5px 0;
      display: block;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      margin: 10px 0;
    }
    button {
      background: #007BFF;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background: #0056b3;
    }
  </style>
  