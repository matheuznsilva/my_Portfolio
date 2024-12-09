from flask import Flask, request, send_from_directory, jsonify
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

app = Flask(__name__, template_folder="public/templates", static_folder="public/static")

# Configurações do Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.getenv('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.getenv('EMAIL_PASS')
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('EMAIL_USER')

mail = Mail(app)

# Serve arquivos estáticos (HTML, CSS, JS)
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(os.path.join(os.getcwd(), 'public', 'static'), filename)

# Rota para o index.html (default em inglês)
@app.route('/')
def index():
    return send_from_directory(os.path.join(os.getcwd(), 'public', 'templates'), 'index.html')

# Rota para o index_pt.html (página em português)
@app.route('/pt_BR')
def index_pt():
    return send_from_directory(os.path.join(os.getcwd(), 'public', 'templates', 'pt_BR'), 'index_pt.html')

# Rota para enviar o e-mail
@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        # Verificar se o Content-Type é application/json
        if not request.is_json:
            return jsonify({"error": "Content-Type must be application/json"}), 415

        # Obtém os dados JSON do corpo da requisição
        data = request.get_json()
        full_name = data.get('fullName')
        email = data.get('email')
        subject = data.get('subject')
        message = data.get('message')
        phone = data.get('phone')

        # Validação básica
        if not all([full_name, email, subject, message]):
            return jsonify({"error": "Missing required fields"}), 400

        # Criação do e-mail
        msg = Message(
            subject=subject,
            sender=app.config['MAIL_DEFAULT_SENDER'],
            recipients=['matheuznsilva@gmail.com'],
            body=f"Mensagem: {message}\n\nDe: {full_name} ({email})\nTelefone: {phone if phone else 'Não informado'}"
        )

        # Envio do e-mail
        mail.send(msg)
        return jsonify({"message": "E-mail enviado com sucesso!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Rota para página de erro 404
@app.errorhandler(404)
def page_not_found(error):
    return send_from_directory(os.path.join(os.getcwd(), 'public', 'templates'), '404_page.html'), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)