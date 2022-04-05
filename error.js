function errorResponder(error, req, res, next) {
  switch (error.name) {
    case "Server Error":
      res.status(500).send("Something broke!");
      break;
    case "badParams":
      res.status(400).send(error.message);
      break;
    case "badId":
      res.status(404).send(error.message);
      break;
    default:
      next(error);
      break;
  }
}

const invalidPathHandler = (req, res, next) => {
  //res.redirect("/error");
};

module.exports = { errorResponder, invalidPathHandler };
