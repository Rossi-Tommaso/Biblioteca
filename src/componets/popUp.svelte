<script>
    import { updateDb } from "../lib/db_scripts/db_functions";
    import SimpleLoader from "./simpleLoader.svelte";

    export let hidden = true;
    export let length;
    export let book = {
        title: "",
        authorName: "",
        authorSurname: "",
        editor: "",
        place: "",
        year: "",
        genre: "",
        comments: "",
        read: false,
        loaned: false,
    };

    let loading = false;

    async function saveChanges() {
        loading = true;
        length = book.id ?? length;
        await updateDb(`protectedData/books/${length}`, { ...book, id: length })
            .then(() => {
                loading = false;
                hidden = true;
            })
            .then(() => window.location.reload())
            .catch(() => {
                loading = false;
                book = {
                    title: "",
                    authorName: "",
                    authorSurname: "",
                    editor: "",
                    year: "",
                    place: "",
                    genre: "",
                    comments: "",
                    read: false,
                    loaned: false,
                };
            });
    }

    function discardChanges() {
        hidden = true;
        book = {
            title: "",
            authorName: "",
            authorSurname: "",
            editor: "",
            year: "",
            place: "",
            genre: "",
            comments: "",
            read: false,
            loaned: false,
        };
    }
</script>

<div class={hidden ? "hidden" : "overlay"}>
    <div class="pop-up">
        {#if loading}
            <div class="loader">
                <SimpleLoader />
            </div>
        {:else}
            <h2>Modifica libro</h2>
            <label>
                Titolo:
                <input type="text" bind:value={book.title} />
            </label>
            <label>
                Autore:
                <input
                    type="text"
                    placeholder="Nome"
                    bind:value={book.authorName}
                />
                <input
                    type="text"
                    placeholder="Cognome"
                    bind:value={book.authorSurname}
                />
            </label>
            <label>
                Editore:
                <input type="text" bind:value={book.editor} />
            </label>
            <label>
                Luogo:
                <input type="text" bind:value={book.place} />
            </label>
            <label>
                Anno:
                <input type="number" bind:value={book.year} />
            </label>
            <label>
                Genere:
                <input type="text" bind:value={book.genre} />
            </label>
            <label>
                Commenti:
                <textarea bind:value={book.comments}></textarea>
            </label>
            <label>
                Copertina:
                <input
                    type="text"
                    bind:value={book.cover}
                    placeholder="Incolla il link del immagine di copertina"
                />
            </label>
            <label>
                Letto:
                <input type="checkbox" bind:checked={book.read} />
            </label>
            <label>
                Prestito:
                <input type="checkbox" bind:checked={book.loaned} />
            </label>
            <div class="buttons">
                <button class="discard" on:click={discardChanges}
                    >Annulla</button
                >
                <button on:click={saveChanges}>Salva</button>
            </div>
        {/if}
    </div>
</div>

<style>
    .hidden {
        display: none;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 12;
    }

    .pop-up {
        display: grid;
        padding: 1em;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #f9f9f9;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-width: 300px;
        width: 90%;
        gap: 0.5em;
    }

    label {
        display: flex;
        flex-direction: column;
        gap: 0.2em;
    }

    input[type="text"],
    textarea {
        padding: 0.5em;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    textarea {
        resize: none;
    }

    button {
        padding: 0.5em 1em;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        gap: 10px;
    }

    .discard {
        background-color: red;
    }

    .loader {
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>
