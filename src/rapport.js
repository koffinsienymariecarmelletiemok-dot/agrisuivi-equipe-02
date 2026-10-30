// ÉQUIPE — Rapport : assembler le travail des quatre membres.
// Fiche : fiches/5-equipe-rapport.md · Vérifier : npm run test:rapport
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { surfaceTotale } from "./parcelles.js";
import { alertesIrrigation } from "./irrigation.js";
import { bilanRecoltes, classerParRevenu } from "./recoltes.js";

// Renvoie les id des alertes qui ont cet état, séparés par ', ', ou 'aucune'.
export function listerParEtat(alertes, etat) {
  const ids = alertes
    .filter(alerte => alerte.etat === etat)
    .map(alerte => alerte.id);

  if (ids.length === 0) return 'aucune';
  return ids.join(', ');
}

// Renvoie le texte complet du rapport (voir fiches/5-equipe-rapport.md).
export function construireRapport(donnees, date) {
  const { parcelles, cultures, releves, recoltes } = donnees;

  const alertes = alertesIrrigation(parcelles, releves, cultures);
  const bilans = bilanRecoltes(parcelles, recoltes, cultures);
  const classement = classerParRevenu(bilans);

  const totaux = {
    surface: surfaceTotale(parcelles),
    production: bilans.reduce((s, b) => s + (b.kg ?? 0), 0),
    revenu: bilans.reduce((s, b) => s + (b.revenu ?? 0), 0),
  };

  const meilleure = classement[0];
  let ligneMeilleure = 'aucune';
  if (meilleure) {
    ligneMeilleure = `${meilleure.id} (${meilleure.producteur}) avec ${meilleure.revenu} FCFA`;
  }

  const lignes = [
    `=== RAPPORT AGRISUIVI DU ${date} ===`,
    `Parcelles suivies : ${parcelles.length}`,
    `Surface totale : ${totaux.surface} ha`,
    '',
    `--- Irrigation ---`,
    `À arroser : ${listerParEtat(alertes, 'a_arroser')}`,
    `À drainer : ${listerParEtat(alertes, 'a_drainer')}`,
    `Sans relevé : ${listerParEtat(alertes, 'sans_releve')}`,
    '',
    `--- Récoltes ---`,
    `Production totale : ${totaux.production} kg`,
    `Revenu estimé : ${totaux.revenu} FCFA`,
    `Meilleure parcelle : ${ligneMeilleure}`,
  ];

  return lignes.join('\n') + '\n';
}

// Écrit le texte dans le fichier demandé. Crée le dossier s'il n'existe pas.
export async function enregistrerRapport(chemin, texte) {
  const dir = dirname(chemin);
  await mkdir(dir, { recursive: true });
  await writeFile(chemin, texte, 'utf8');
}