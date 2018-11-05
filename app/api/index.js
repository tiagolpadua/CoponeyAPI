var db = require('../../config/database');

var api = {}

api.adiciona = function (req, res) {
    var poney = req.body;
    console.log("Adicionando: ");
    console.log(req.body);
    delete poney._id;
    db.insert(poney, function (err, newDoc) {
        if (err) return console.log(err);
        console.log('Adicionado com sucesso: ' + newDoc._id);
        res.json(newDoc._id);
    });
};

api.busca = function (req, res) {
    db.findOne({ _id: req.params.poneyId }, function (err, doc) {
        if (err) return console.log(err);
        res.json(doc);
    });
};

api.atualiza = function (req, res) {
    console.log('Parâmetro recebido:' + req.params.poneyId);
    db.update({ _id: req.params.poneyId }, req.body, function (err, numReplaced) {
        if (err) return console.log(err);
        if (numReplaced) res.status(200).end();
        res.status(500).end();
        console.log('Atualizado com sucesso: ' + req.body._id);
        res.status(200).end();
    });
};

api.lista = function (req, res) {
    db.find({}).sort({ nome: 1 }).exec(function (err, doc) {
        if (err) return console.log(err);
        res.json(doc);
    });
};

api.remove = function (req, res) {
    db.remove({ _id: req.params.poneyId }, {}, function (err, numRemoved) {
        if (err) return console.log(err);
        console.log('removido com sucesso');
        if (numRemoved) res.status(200).end();
        res.status(500).end();
    });
};

module.exports = api;