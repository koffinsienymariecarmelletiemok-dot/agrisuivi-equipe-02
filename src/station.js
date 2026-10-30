// BONUS — Station connectée : simuler des capteurs qui répondent après un délai.
// Fiche : fiches/6-bonus-station.md · Vérifier : npm run test:station

// Renvoie une promesse qui se résout après capteur.delai millisecondes avec
// { parcelle, humidite }, ou qui est rejetée si le capteur n'est pas en ligne.
export function interrogerCapteur(capteur) {
   return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (capteur.enLigne) {
        resolve({ parcelle: capteur.parcelle, humidite: capteur.humidite });
      } else {
        reject(new Error(`Capteur ${capteur.id} hors ligne`));
      }
    }, capteur.delai);
  });
}


// Même travail que interrogerCapteur, mais ne rejette jamais :
// en cas d'erreur, renvoie { parcelle, erreur } avec le message de l'erreur.
export async function interrogerSansPlanter(capteur) {
}

// Interroge les capteurs L'UN APRÈS L'AUTRE (on attend chaque réponse).
export async function releverUnParUn(capteurs) {
  const listeReponses = new Array();
  for await (const capteur of capteurs) {
    const reponseCapteur = interrogerSansPlanter(capteur)
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