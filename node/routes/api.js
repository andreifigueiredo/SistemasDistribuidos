// Dependencias
var express = require('express');
var router = express.Router();

//Models
var Nota = require('../models/nota');

// Rotas

// Cadastra uma nova nota
router.post('/cadastrarNota', function(req, res) {
    var nota = new Nota();
	var query = { 'mat': req.body.matricula, 'cod_disc': req.body.disciplina};

		Nota.findOne(query, function (err, nota) {
	     	if (nota != null){
	     		var udpate =  update = {"$set": { "nota": req.body.nota}};
	     		var options = { "multi": true };
				Nota.update( query, update, options , function(err, raw) {
				    if (err) {
				      res.send(err);
				    }
				    res.json({codigo: 1, mensagem: 'Nota atualizada' });
				  });
	     	}
	     	else{
	     		nota = new Nota();
	     		nota.mat = req.body.matricula;
        		nota.cod_disc = req.body.disciplina;
        		nota.nota = req.body.nota;
	     		nota.save(function(err) {
		          	if (err)
		                res.send(err);

		            res.json({codigo: 1, mensagem: 'Nota criada com sucesso!' });
		        });
	     	}
		});
      
})

// Consulta uma nota de um aluno em uma disciplina
router.get('/consultarNota', function(req, res) {
    var nota = new Nota();
    var query = {'mat': req.query.matricula,'cod_disc': req.query.disciplina};
    
    Nota.findOne(query,function (err, nota) {
     	if (nota != null){
			res.json({codigo: 1, nota: nota.nota})
     	}
     	else
     		res.json({codigo: 0, mensagem: 'Nota não encontrada' });
	});
})

// Consulta todas as notas de um aluno
router.get('/consultarNotas', function(req, res) {
    var nota = new Nota();
    var query = { 'mat': req.query.matricula};

    Nota.find(query,function (err, nota) {
     	if (nota.length > 0){
			res.json({codigo: 1, notas: nota.map(function(i) {
				  return i.nota;
				})
			})
     	}
     	else
     		res.json({codigo: 0, mensagem: 'Matricula não encontrada' });
	});
})

// Consulta o CR de um aluno dada sua matricula
router.get('/consultarCR', function(req, res) {
 	var nota = new Nota();
 	var query = {'mat': req.query.matricula};

    Nota.find(query,function (err, nota) {
     	if (nota.length > 0){
			var notas = nota.map(function(i) {
				  return i.nota;
				});

			var sum = 0;
			for( var i = 0; i < notas.length; i++ ){
			    sum += parseFloat( notas[i], 10 );
			}
			var CR = sum/notas.length;

			res.json({codigo: 1, CR: CR });
     	}
     	else
     		res.json({codigo: 0, mensagem: 'Essa matrícula não possui notas cadastradas' });
	});
})

//Retorna router
module.exports = router;