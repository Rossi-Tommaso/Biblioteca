<script>
    import SimpleLoader from "./simpleLoader.svelte";
    import { updateDb } from "../lib/db_scripts/db_functions";
    import { biblioteca } from "../stores/libStore";
    import { toast } from "../stores/utilsStore";

    export let hidden = true;
    export let length;
    export let update;
    export let scaffali;
    export let book = createEmptyBook();

    let editOrAdd = book.title ? "Modifica" : "Aggiungi";
    let loading = false;
    let newBookshelf = "";
    let showNewBookshelfInput = false;
    let disabled = false;

    function createEmptyBook() {
        return {
            title: "",
            authorName: "",
            authorSurname: "",
            editor: "",
            place: "",
            year: "",
            genre: "",
            comments: "",
            bookshelf: "",
            read: false,
            loaned: false,
        };
    }

    function resetBook() {
        book = createEmptyBook();
    }

    const addNewBookshelf = () => {
        const trimmed = newBookshelf.trim();
        if (trimmed) {
            scaffali = new Set([...scaffali, trimmed]);
            newBookshelf = "";
            showNewBookshelfInput = false;
            toast("Nuovo scaffale aggiunto", "success");
        }
    };
    async function fetchBookDetails() {
    if (!book.isbn) {
        toast("Inserisci un ISBN valido", "fail");
        return;
    }

    loading = true;
    try {
        const res = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${book.isbn}&format=json&jscmd=data`);
        const data = await res.json();
        const bookData = data[`ISBN:${book.isbn}`];

        if (bookData) {
            book.title = bookData.title || "";
            book.authorName = bookData.authors?.[0]?.name.split(" ")[0] || "";
            book.authorSurname = bookData.authors?.[0]?.name.split(" ").slice(1).join(" ") || "";
            book.editor = bookData.publishers?.[0]?.name || "";
            book.year = bookData.publish_date || "";
            book.cover = bookData.cover?.large || "";
        } else {
            toast("Libro non trovato!", "fail");
        }
    } catch (error) {
        toast("Errore nel recupero dati", "fail");
    } finally {
        loading = false;
    }
}


    async function saveChanges() {
        loading = true;
        try {
            const id = book.id ?? length;
            await updateDb(`protectedData/${$biblioteca}/${id}`, {
                ...book,
                id,
            });

            toast(
                `Libro ${editOrAdd === "Aggiungi" ? "aggiunto" : "modificato"} con successo.`,
                "success",
            );

            update = !update;
            hidden = true;
            resetBook();
        } catch (error) {
            toast(
                `ERRORE: Il libro non è stato ${editOrAdd === "Aggiungi" ? "aggiunto" : "modificato"} con successo.`,
                "fail",
            );
        } finally {
            loading = false;
        }
    }

    function discardChanges() {
        hidden = true;
        resetBook();
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
            <h2 class="form-title">{editOrAdd} libro</h2>
            <div class="form-grid">
                <div class="isbn-section full-width">
                    <label>
                        <span class="label-text">ISBN:</span>
                        <div class="isbn-input">
                            <input
                                type="text"
                                bind:value={book.isbn}
                                placeholder="Inserisci ISBN"
                            />
                            <button
                                class="fetch-btn"
                                on:click={fetchBookDetails}
                                {disabled}
                                >{loading ? "..." : "Recupera dati"}</button
                            >
                        </div>
                    </label>
                </div>

                <label class="full-width">
                    <span class="label-text">Titolo:</span>
                    <input type="text" bind:value={book.title} required />
                </label>

                <div class="author-group full-width">
                    <span class="label-text">Autore:</span>
                    <div class="author-inputs">
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
                    </div>
                </div>

                <label>
                    <span class="label-text">Editore:</span>
                    <input type="text" bind:value={book.editor} />
                </label>

                <label>
                    <span class="label-text">Luogo:</span>
                    <input type="text" bind:value={book.place} />
                </label>

                <label>
                    <span class="label-text">Anno:</span>
                    <input type="number" bind:value={book.year} />
                </label>

                <label>
                    <span class="label-text">Genere:</span>
                    <input type="text" bind:value={book.genre} />
                </label>

                <div class="bookshelf-section full-width">
                    <label>
                        <span class="label-text">Scaffale:</span>
                        <select bind:value={book.bookshelf}>
                            <option value="">Seleziona uno scaffale</option>
                            {#each [...scaffali] as shelf}
                                <option value={shelf}>{shelf}</option>
                            {/each}
                        </select>
                    </label>

                    {#if showNewBookshelfInput}
                        <div class="new-bookshelf-input">
                            <input
                                type="text"
                                bind:value={newBookshelf}
                                placeholder="Nome nuovo scaffale"
                            />
                            <button class="add-shelf" on:click={addNewBookshelf}
                                >Aggiungi</button
                            >
                        </div>
                    {:else}
                        <button
                            class="new-shelf"
                            on:click={() => (showNewBookshelfInput = true)}
                            >Nuovo scaffale</button
                        >
                    {/if}
                </div>

                <label class="full-width">
                    <span class="label-text">Commenti:</span>
                    <textarea bind:value={book.comments}></textarea>
                </label>

                <label class="full-width">
                    <span class="label-text">Copertina:</span>
                    <input
                        type="text"
                        bind:value={book.cover}
                        placeholder="Incolla il link dell'immagine di copertina"
                    />
                </label>

                <div class="toggles-group full-width">
                    <label class="toggle">
                        <span class="label-text">Letto:</span>
                        <input type="checkbox" bind:checked={book.read} />
                        <span class="checkmark"></span>
                    </label>

                    <label class="toggle">
                        <span class="label-text">Prestito:</span>
                        <input type="checkbox" bind:checked={book.loaned} />
                        <span class="checkmark"></span>
                    </label>
                </div>

                <div class="buttons full-width">
                    <button class="discard" on:click={discardChanges}
                        >Annulla</button
                    >
                    <button class="save" on:click={saveChanges}>Salva</button>
                </div>
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
        background-color: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        z-index: 12;
    }

    .pop-up {
        background-color: #ffffff;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        padding: 2rem;
    }

    .form-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1a1a1a;
        margin: 0 0 1.5rem 0;
        text-align: center;
    }

    .form-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.25rem;
    }

    .full-width {
        grid-column: 1 / -1;
    }

    .label-text {
        font-size: 0.9rem;
        font-weight: 500;
        color: #4b5563;
        margin-bottom: 0.3rem;
        display: block;
    }

    input[type="text"],
    input[type="number"],
    textarea,
    select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        background-color: #f9fafb;
        font-size: 0.95rem;
        transition: all 0.2s ease;
    }

    input:focus,
    textarea:focus,
    select:focus {
        outline: none;
        border-color: #4f46e5;
        background-color: #ffffff;
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }

    .author-group {
        display: flex;
        flex-direction: column;
    }

    .author-inputs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
    }

    textarea {
        resize: vertical;
        min-height: 100px;
    }

    .bookshelf-section {
        display: grid;
        gap: 1rem;
    }

    .new-bookshelf-input {
        display: flex;
        gap: 0.75rem;
    }

    button {
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 500;
        font-size: 0.95rem;
        transition: all 0.2s ease;
        border: none;
        cursor: pointer;
    }

    .new-shelf {
        background-color: #60a5fa;
        color: white;
        width: fit-content;
    }

    .new-shelf:hover {
        background-color: #3b82f6;
        transform: translateY(-1px);
    }

    .add-shelf {
        background-color: #10b981;
        color: white;
    }

    .add-shelf:hover {
        background-color: #059669;
    }

    .toggles-group {
        display: flex;
        justify-content: space-between;
        gap: 2rem;
        margin: 0.5rem 0;
    }

    .toggle {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
    }

    .toggle input[type="checkbox"] {
        appearance: none;
        width: 1.5rem;
        height: 1.5rem;
        border: 2px solid #e5e7eb;
        border-radius: 4px;
        cursor: pointer;
        position: relative;
        transition: all 0.2s ease;
    }

    .toggle input[type="checkbox"]:checked {
        background-color: #4f46e5;
        border-color: #4f46e5;
    }

    .toggle input[type="checkbox"]:checked::after {
        content: "✓";
        color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1rem;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 1rem;
    }

    .save {
        background-color: #4f46e5;
        color: white;
    }

    .save:hover {
        background-color: #4338ca;
        transform: translateY(-1px);
    }

    .discard {
        background-color: #ffffff;
        color: #ef4444;
        border: 1px solid #ef4444;
    }

    .discard:hover {
        background-color: #ef4444;
        color: white;
        transform: translateY(-1px);
    }

    .loader {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        padding: 2rem;
    }

    .isbn-input {
        display: flex;
        gap: 0.5rem;
    }

    .isbn-input input {
        flex: 1;
    }

    .fetch-btn {
        background-color: #60a5fa;
        color: white;
        border: none;
        padding: 0.75rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .fetch-btn:hover {
        background-color: #3b82f6;
    }

    .fetch-btn:disabled {
        background-color: #a5b4fc;
        cursor: not-allowed;
    }

    @media (max-width: 640px) {
        .pop-up {
            width: 95%;
            padding: 1.5rem;
            margin: 1rem;
        }

        .form-grid {
            grid-template-columns: 1fr;
        }

        .toggles-group {
            flex-direction: column;
            gap: 1rem;
        }

        .buttons {
            flex-direction: column-reverse;
        }

        button {
            width: 100%;
        }
    }
</style>
