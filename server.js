const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Usar variáveis de ambiente para maior segurança

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Para lidar com dados JSON, se necessário
app.use(cors()); // Permite comunicação entre frontend e backend

// Serve arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));  // Configura a pasta 'public' como estática

// Configura o transporte para enviar e-mail via Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Seu e-mail do Gmail, agora como variável de ambiente
        pass: process.env.EMAIL_PASS   // Sua senha de app do Gmail como variável de ambiente
    }
});

// Rota para o index.html (default em inglês)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html')); // Servir a página principal
});

// Rota para o index_pt.html (página em português)
app.get('/pt_BR', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'pt_BR', 'index_pt.html')); // Servir a página em português
});

// Rota para enviar o e-mail
app.post('/send-email', (req, res) => {
    console.log(req.body); // Verifica se os dados estão chegando corretamente
    const { fullName, email, subject, message, phone } = req.body;

    const mailOptions = {
        from: email, // Endereço de e-mail do usuário que preencheu o formulário
        to: 'matheuznsilva@gmail.com', // Para onde o e-mail será enviado
        subject: subject,
        text: `${message}\n\nMensagem de: ${fullName}\nEmail: ${email}\nTelefone: ${phone}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.send('E-mail enviado com sucesso!');
    });
});

// Rota para página de erro 404
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'html', '404_page.html')); // Servir página de erro 404
});

// Inicia o servidor na porta 3000 e serve o frontend
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

