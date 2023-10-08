const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
const transport = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '8023439c132a93',
    pass: 'bff6d017a2e8ad'
  }
});

app.post('/enviar-correo', (req, res) => {
  const { destinatario, respuestas } = req.body;
  const respuestasHTML = respuestas.map((respuesta, index) => `<li>Respuesta ${index + 1}: ${respuesta}</li>`).join('');

  const correo = {
    from: 'tu-correo@dominio.com',
    to: destinatario,
    subject: 'Resultado del test',
    html: `<!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resultado del Test</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        }
    
        h1 {
          color: #4CAF50;
        }
    
        ul {
          list-style: none;
          padding: 0;
        }
    
        li {
          margin-bottom: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Resultado del Test</h1>
        <p>Aquí están las respuestas que proporcionaste:</p>
        <ul>
        ${respuestasHTML}
        </ul>
      </div>
    </body>
    </html>
             
           `
  };

  transport.sendMail(correo, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado con éxito:', info.response);
      res.status(200).send('Correo enviado con éxito');
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});