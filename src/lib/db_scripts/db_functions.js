import { ref, set, get, update, remove } from "firebase/database";
import { db } from "../firebase.config";

let fetchDb = async (path) => {
    try {
        const dbRef = ref(db, path);
        const snapshot = await get(dbRef);
        // console.log('SNAP:', snapshot.val())
        return snapshot.exists() ? snapshot.val() : null;
    } catch (e) {
        console.error('Errore while fetching data:', e);
    }
}

const writeDb = async (path, data) => {
    try {
        const dbRef = ref(db, path);
        await set(dbRef, data);
    } catch (e) {
        console.error('Error while writing data:', e);
    }
}

const updateDb = async (path, data) => {
    try {
        const dbRef = ref(db, path);
        await update(dbRef, data);
    } catch (e) {
        console.error('Error while updating data:', e);
    }
}

const deleteOnDb = async (path) => {
    try {
        const dbRef = ref(db, path);
        await remove(dbRef);
    } catch (e) {
        console.error('Error while cancelling data:', e);
    }
}

const getUserRole = async (uid) => {
    try{
        const path = `users/${uid}/role`;
        const role = await fetchDb(path);

        console.log('user role:', role);
        
        if (role === 'ADMIN') 
            return 2;
        else if (role === 'EDITOR') 
            return 1;
        else
            return 0;
    } catch (e) {
        console.error('Error while getting user role:', e);
    }
}

const getBiblioteche = async () => {
    try {
        const path = `protectedData/`;
        let biblioteche = await fetchDb(path);
        if (!biblioteche || typeof biblioteche !== "object") {
            console.error("Dati non validi:", biblioteche);
            return [];
        }
    return Object.keys(biblioteche);
    } catch (e) {
        console.error('Error while getting all library name:', e);
    }
};

const createNewBiblioteca = async (name) => {
    try {
        const path = `protectedData/${name}`;
        await updateDb(path, {'0' : {'title': 'my first book'}});
    }
    catch (e) {
        console.error('Errore while creating new library:', e);
    }
};

export { fetchDb, writeDb, updateDb, deleteOnDb, getUserRole, getBiblioteche, createNewBiblioteca };

