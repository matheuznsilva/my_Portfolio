const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config(); // Usar variáveis de ambiente para maior segurança

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Configura o transporte para enviar e-mail via Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Seu e-mail do Gmail, agora como variável de ambiente
        pass: process.env.EMAIL_PASS   // Sua senha de app do Gmail como variável de ambiente
    }
});

// Rota para enviar o e-mail
app.post('/send-email', (req, res) => {
    const { fullName, email, subject, message, phone } = req.body;

    const mailOptions = {
        from: email, // Endereço de e-mail do usuário que preencheu o formulário
        to: 'matheuznsilva@gmail.com', // Para onde o e-mail será enviado
        subject: subject,
        text: `${message}\n\nMensagem de: ${fullName}\nTelefone: ${phone}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.send('E-mail enviado com sucesso!');
    });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
