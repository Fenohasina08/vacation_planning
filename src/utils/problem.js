// Format d'erreur application/problem+json.
module.exports = (status, title, detail, extra = {}) => ({
  type: 'about:blank',
  title,
  status,
  detail,
  ...extra
});
