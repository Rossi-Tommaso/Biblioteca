<script>
    import SimpleLoader from "./simpleLoader.svelte";
    import { updateDb } from "../lib/db_scripts/db_functions";
    import { biblioteca } from "../stores/libStore";
    import { toast } from "../stores/utilsStore";

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
    
    let editOrAdd = !book.title ? "Aggiungi" : "Modifica";
    let loading = false;

    async function saveChanges() {
        loading = true;
        length = book.id ?? length;
        console.log($biblioteca);
        if ($biblioteca) {
            await updateDb(`protectedData/${$biblioteca}/${length}`, {
                ...book,
                id: length,
            })
                .then(() => {
                    toast(`Libro ${editOrAdd === 'Aggiungi' ? 'aggiunto' : 'modificato'} con successo.` , "success");
                    loading = false;
                    hidden = true;
                })
                .then(() => window.location.reload())
                .catch(() => {
                    toast(`ERRORE: Il libro non è stato ${editOrAdd === 'Aggiungi' ? 'aggiunto' : 'modificato'} con successo.` , "fail");
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
        {#if loading || !$biblioteca}
            <div class="loader">
                <SimpleLoader />
                <div class="buttons">
                    <button class="discard" on:click={discardChanges}
                        >Annulla</button
                    >
            </div>
        </div>
        {:else}
            <h2>{editOrAdd} libro</h2>
            <label>
                Titolo:
                <input type="text" bind:value={book.title} required />
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
            <div class="check">
                Letto:
                <input type="checkbox" bind:checked={book.read} />
            </div>
            <div class="check">
                Prestito:
                <input type="checkbox" bind:checked={book.loaned} />
            </div>
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

    .check {
        margin-bottom: 2%;
        display: grid;
        column-gap: 60%;
        grid-template-columns: repeat(2, 1fr);
    }
</style>
