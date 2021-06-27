const Question = require('../models/Question');

const index = function (req, res) {
  const roomId = req.params.room;
  const questionId = req.params.question;
  const action = req.params.action;
  const password = req.body.password;

  console.log(`${roomId} // ${questionId } // ${action} // ${password} `)
}


 const create = async function (req, res) {

  console.log(req);

  const resultCad = await Question.create(
      {
        "id": -1,
        "titulo":req.body.titulo,
        "read": 0,
        roomId: req.params.room
      }
  ).then(function () {
      return res.redirect(`/room/${roomId}`)   
    }        
  ).catch(function (erro) {
          return res.status(400).json({
          error: true,
          message: "Erro: Sala não cadastrado com sucesso!"
      });
  });
  } 


module.exports = { index, create }




/*

module.exports = {
 index(req, res) {
    const roomId = req.params.room;
    const questionId = req.params.question;
    const action = req.params.action;
    const password = req.body.password;

    console.log(`${roomId} // ${questionId } // ${action} // ${password} `)

  }
}

*/