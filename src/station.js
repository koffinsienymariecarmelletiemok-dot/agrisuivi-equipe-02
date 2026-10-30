// BONUS — Station connectée : simuler des capteurs qui répondent après un délai.
// Fiche : fiches/6-bonus-station.md · Vérifier : npm run test:station

// Renvoie une promesse qui se résout après capteur.delai millisecondes avec
// { parcelle, humidite }, ou qui est rejetée si le capteur n'est pas en ligne.
export function interrogerCapteur(capteur) {
<<<<<<< HEAD



=======
   return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (capteur.enLigne) {
        resolve({ parcelle: capteur.parcelle, humidite: capteur.humidite });
      } else {
        reject(new Error(`Capteur ${capteur.id} hors ligne`));
      }
    }, capteur.delai);
  });
>>>>>>> e0939c333e8792087edbf86fe6f0e7395edcdd8e
}


// Même travail que interrogerCapteur, mais ne rejette jamais :
// en cas d'erreur, renvoie { parcelle, erreur } avec le message de l'erreur.
export async function interrogerSansPlanter(capteur) {
<<<<<<< HEAD
  
=======
  try{
    return await interrogerCapteur(capteur);
  } catch(erreur){
    return{ parcelle: capteur.parcelle, erreur: erreur.message};
  }
>>>>>>> e0939c333e8792087edbf86fe6f0e7395edcdd8e
}

// Interroge les capteurs L'UN APRÈS L'AUTRE (on attend chaque réponse).
export async function releverUnParUn(capteurs) {
  const listeReponses = new Array();
  for await (const capteur of capteurs) {
  const reponseCapteur = await interrogerSansPlanter(capteur);
  listeReponses.push(reponseCapteur)
  }
  return listeReponses;

}

// Interroge tous les capteurs EN MÊME TEMPS. Les résultats gardent l'ordre des capteurs.
export async function releverEnParallele(capteurs) {
  return Promise.all(
    capteurs.map((capteur) =>
      interrogerSansPlanter(capteur)
    )
  );
}