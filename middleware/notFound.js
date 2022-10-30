const notFound = (req, res) => {
  res.status(404).json("Ressource non disponible");
};

module.exports = notFound;
