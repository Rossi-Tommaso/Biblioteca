import { get, ref, update } from 'firebase/database';
import { db } from '../firebase.config.js';

//'users/53BdModGCwex0cSwcs8dJM997AQ2/role': 'ADMIN', // role structure example

export let assignRole = (uid, role, email) => {
  if (!uid || !role) {
    console.error('UID o ruolo non forniti.');
    return;
  }

  let updates = { [`users/${uid}/role`]: role };

  update(ref(db), updates)
    .then(() => {
      console.log('Dati aggiunti o aggiornati con successo');
    })
    .catch((e) => {
      if (e.code === 'PERMISSION_DENIED') {
        console.error('Permessi insufficienti per aggiornare i dati.');
      } else {
        console.error('Errore nel assegnazione del ruolo:', e);
      }
    });

    updates = { [`users/${uid}/email`]: email };

    update(ref(db), updates)
      .then(() => {
        console.log('Dati aggiunti o aggiornati con successo');
      })
      .catch((e) => {
        if (e.code === 'PERMISSION_DENIED') {
          console.error('Permessi insufficienti per aggiornare i dati.');
        } else {
          console.error('Errore nel assegnazione del ruolo:', e);
        }
      });
}