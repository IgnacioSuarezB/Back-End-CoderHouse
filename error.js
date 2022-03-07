function errorResponder(error, req, res, next) {
  if (error.name == "Server Error") res.status(500).send("Something broke!");
  if (error.name == "badParams") res.status(400).send(error.message);
  if (error.name == "badId") res.status(404).send(error.message);
  if (!error) next(error);
}

const invalidPathHandler = (req, res, next) => {
  res.redirect("/error");
};

module.exports = { errorResponder, invalidPathHandler };
