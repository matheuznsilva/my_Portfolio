from flask import Flask, request, send_from_directory, jsonify, redirect, url_for
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv

# Carregar variáveis de ambiente do arquivo .env na raiz do projeto
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))

# Importar configurações do arquivo config.py
from src.config import Config

# Definir os caminhos base para templates e estáticos
# __file__ aponta para 'src/app.py', então precisamos subir dois níveis para a raiz do projeto.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATE_FOLDER = os.path.join(BASE_DIR, 'public', 'templates')
STATIC_FOLDER = os.path.join(BASE_DIR, 'public', 'static')

app = Flask(__name__, template_folder=TEMPLATE_FOLDER, static_folder=STATIC_FOLDER)

# Carregar configurações do Flask-Mail do objeto Config
app.config.from_object(Config)

mail = Mail(app)

# Rota para o index.html (default em inglês)
@app.route('/')
def index():
    return send_from_directory(app.template_folder, 'index.html')

# Rota para o index_pt.html (página em português)
@app.route('/pt_BR')
def index_pt():
    return send_from_directory(os.path.join(app.template_folder, 'pt_BR'), 'index_pt.html')

# Rota para enviar o e-mail
@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        if not request.is_json:
            return jsonify({"error": "Content-Type must be application/json"}), 415

        data = request.get_json()
        full_name = data.get('fullName')
        email = data.get('email')
        subject = data.get('subject')
        message = data.get('message')
        phone = data.get('phone')

        if not all([full_name, email, subject, message]):
            return jsonify({"error": "Missing required fields"}), 400

        msg = Message(
            subject=subject,
            sender=app.config['MAIL_DEFAULT_SENDER'],
            recipients=[app.config['ADMIN_EMAIL']], # Usando o email do administrador do config
            body=f"Mensagem: {message}\n\nDe: {full_name} ({email})\nTelefone: {phone if phone else 'Não informado'}"
        )

        mail.send(msg)
        return jsonify({"message": "E-mail enviado com sucesso!"}), 200

    except Exception as e:
        app.logger.error(f"Erro ao enviar e-mail: {e}") # Melhorar o log de erro
        return jsonify({"error": "Ocorreu um erro ao enviar sua mensagem. Tente novamente."}), 500

# Rota para página de erro 404
@app.errorhandler(404)
def page_not_found(error):
    # Retorna o 404_page.html
    return send_from_directory(app.template_folder, '404_page.html'), 404

if __name__ == '__main__':
    # Quando rodando localmente sem Docker, o caminho BASE_DIR é ajustado.
    # No Docker, o WORKDIR é /app, e os caminhos já estarão corretos.
    app.run(host='0.0.0.0', port=8085, debug=True)