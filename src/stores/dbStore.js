import { writable } from "svelte/store";
import { db } from "../lib/firebase.config";
import { ref, get, set, update, remove } from "firebase/database";

let fetchDb = async (path) => {
    try {
        const dbRef = ref(db, path);
        const snapshot = await get(dbRef);
        return snapshot.exists() ? snapshot.val() : null;
    } catch (e) {
        console.error('Errore nel caricamento dei libri:', e);
    }
}

let writeDb = async (path, data) => {
    try{
        const dbRef = ref(db, path);
        await set(dbRef, data);
    } catch (e) {
        console.error('Errore nella scrittura del database', e);
    }
}

let updateDb = async (path, data) => {
    try{
        const dbRef = ref(db, path);
        await update(dbRef, data);
    } catch (e) {
        console.error('Errore nella scrittura del database', e);
    }
}

let deleteOnDb = async (path) => {
    try {
        const dbRef = ref(db, path)
        await remove(dbRef);
    }
}

let books = writable([]);

export { fetchDb, writeDb, updateDb, deleteOnDb, books };

