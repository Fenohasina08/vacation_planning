// Isolation multi-entreprise.
// L'entreprise active doit provenir de la session côté serveur.
// Ne jamais accepter company_id comme preuve d'appartenance.
module.exports = (req, res, next) => {
  // TODO: Charger le contexte entreprise depuis la session vérifiée.
  next();
};
