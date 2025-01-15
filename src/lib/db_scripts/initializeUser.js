import { get, ref, update } from 'firebase/database';
import { db } from '../firebase.config.js';

//'users/53BdModGCwex0cSwcs8dJM997AQ2/role': 'ADMIN', // role structure example

export let initializeUser = async (uid, role, email, biblioteca=null) => {
  if (!uid || !role || !email) {
    console.error('UID o ruolo non forniti.');
    return;
  }

  try {
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(userRef);
    
    if (snapshot.exists()) {
      console.log('Utente già presente nel database');
      return;
    }

    const updates = {
      [`users/${uid}/role`]: role,
      [`users/${uid}/email`]: email,
      [`users/${uid}/biblioteca`]: biblioteca,
    };

    await update(ref(db), updates);
    console.log('Dati aggiunti o aggiornati con successo');
  } catch (e) {
    if (e.code === 'PERMISSION_DENIED') {
      console.error('Permessi insufficienti per aggiornare i dati.');
    } else {
      console.error('Errore durante l\'assegnazione del ruolo:', e);
    }
  }
};
