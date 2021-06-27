const Room= require('../models/Room');

function getRoomId() {
  let roomId = '';
  for (let i = 0; i < 6; i++) {
    roomId += Math.floor(Math.random() * 10).toString();
  }
  return (roomId);
}

module.exports = {
  async create(req, res) {

   // const rommId = 123456;
    const roomId = getRoomId();

    const resultCad = await Room.create(
      {
        "id": roomId,
        "pass":req.body.password
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
}