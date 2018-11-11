var api = require("../api"),
  path = require("path");

module.exports = function(app) {
  app
    .route("/v1/poneys")
    .post(api.adiciona)
    .get(api.lista);

  app
    .route("/v1/poneys/:poneyId")
    .delete(api.remove)
    .get(api.busca)
    .put(api.atualiza);

  app.route("/v1/poneys/exclusaologica/:poneyId").delete(api.removeLogicamente);

  app.all("/*", function(req, res) {
    res.sendFile(path.join(app.get("publicPath"), "index.html"));
  });
};
