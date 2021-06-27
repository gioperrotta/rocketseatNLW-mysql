const express = require('express');
const cors = require('cors');
const upload = require('./middlewares/uploadImgAnuncio');
const fs = require('fs');
const path = require('path');
const app = express();

const Anuncio = require('./models/Anuncio');

app.use(express.json());

app.use('/files', express.static(path.resolve(__dirname, "public", "upload")));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});


//const db = require("./models/db");

app.get('/', async (req, res) => {
    await Anuncio.findAll({ order: [['id', 'DESC']] }).then(function (anuncios) {
        res.json({ anuncios });
    });
});

app.get('/visualizar/:id', async (req, res) => {
    await Anuncio.findByPk(req.params.id)
        .then(anuncio => {
            if(anuncio.imagem){
                var endImagem = "http://localhost:8080/files/anuncios/" + anuncio.imagem;
            }else{
                var endImagem = "http://localhost:8080/files/anuncios/icone_anuncio.jpg";
            }

            return res.json({
                error: false,
                anuncio,
                endImagem
            });
        }).catch(function (erro) {
            return res.status(400).json({
                error: true,
                message: "Erro: Anúncio não encontrado!"
            });
        });
});

app.post('/cadastrar', async (req, res) => {
    const resultCad = await Anuncio.create(
        req.body
    ).then(function () {
        return res.json({
            error: false,
            message: "Anúncio cadastrado com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: Anúncio não cadastrado com sucesso!"
        });
    });
});

app.put('/editar', async (req, res) => {
    /*await sleep(3000);

    function sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }*/
    
    await Anuncio.update(req.body, {
        where: { id: req.body.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Anúncio editado com sucesso!"
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: Anúncio não editado com sucesso!"
        });
    });
});

app.put('/editar-anuncio-img/:id', upload.single('imagem'), async (req, res) => {

    /*await sleep(3000);

    function sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }*/

    if(req.file){   
        await Anuncio.findByPk(req.params.id).then(anuncio => {
            //console.log(anuncio.dataValues.imagem);

            const imgAntiga = "./public/upload/anuncios/" + anuncio.dataValues.imagem;

            fs.access(imgAntiga, (err) => {
                if(!err){
                    fs.unlink(imgAntiga, () => {});
                }
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message: "Erro: Anúncio não encontrado!"
            });
        });

        await Anuncio.update({imagem: req.file.filename},{where: {id: req.params.id}}).then(function(){
            return res.json({
                error: false,
                message: "Imagem do anúncio editado com sucesso!"
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message: "Erro: Imagem do anúncio não editado com sucesso!"
            });
        });
        
    }else{
        return res.status(400).json({
            error: true,
            message: "Erro: Selecione uma imagem válida JPEG ou PNG!"
        });
    }
});

app.delete('/apagar/:id', async (req, res) => {
    await Anuncio.destroy({
        where: { id: req.params.id }
    }).then(function () {
        return res.json({
            error: false,
            message: "Anúncio apagado com sucesso!"
        });
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Erro: Anúncio não apagado com sucesso!"
        });
    });
});

app.listen(8080, function () {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});