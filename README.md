# My Portfolio

Este é o repositório do meu portfólio pessoal, desenvolvido para apresentar meus projetos, habilidades e experiência 
profissional. O site é construído com Flask no backend para servir as páginas e gerenciar o envio de formulários de 
contato, e um frontend moderno com HTML5, CSS3 e JavaScript.

## Visão Geral do Projeto

O portfólio inclui as seguintes seções:
* **Home:** Introdução e links para perfis sociais.
* **Education:** Minha formação acadêmica e cursos.
* **Projects:** Um carrossel interativo de projetos com descrições e links.
* **My Skills:** Habilidades técnicas e profissionais com indicadores visuais.
* **Testimonials:** Depoimentos.
* **Contact:** Formulário de contato para comunicação direta.

O site suporta **idiomas inglês e português (Brasil)**, com opções de troca de idioma na navegação.

## Estrutura do Projeto

A estrutura de pastas do projeto foi organizada para facilitar a manutenção e escalabilidade:
```
.
├── src/                          # Contém o código-fonte da aplicação Python (Flask)
│   ├── app.py                    # Aplicação Flask principal
│   └── config.py                 # Configurações da aplicação
├── public/                       # Contém todos os arquivos estáticos e templates do frontend
│   ├── static/                   # Assets estáticos (CSS, JS, Imagens)
│   │   ├── css/                  # Folhas de estilo CSS
│   │   │   └── style.css
│   │   ├── images/               # Imagens do projeto
│   │   │   └── work/
│   │   │       └── ...
│   │   └── js/                   # Scripts JavaScript
│   │       └── script.js
│   └── templates/                # Templates HTML
│       ├── 404_page.html         # Página de erro 404
│       ├── index.html            # Página principal em inglês
│       └── pt_BR/                # Pasta para templates em português
│           └── index_pt.html     # Página principal em português
├── Dockerfile                    # Configuração para criar a imagem Docker
├── README.md                     # Este arquivo de documentação
└── requirements.txt              # Dependências Python do projeto

```
## Configuração e Execução (Localmente)

Para executar o projeto localmente, siga os passos abaixo:

### Pré-requisitos
* Python 3.8+
* pip (gerenciador de pacotes do Python)

### 1. Clonar o Repositório
```bash
git clone git@github.com:matheuznsilva/my_Portfolio.git
cd my_Portfolio # Ou o nome da pasta do seu projeto
```
### 2. Criar e Ativar o Ambiente Virtual
É altamente recomendável usar um ambiente virtual para isolar as dependências do projeto:

```Bash
python3 -m venv venv
# No Linux/macOS:
source venv/bin/activate
# No Windows:
.\venv\Scripts\activate
```
### 3. Instalar as Dependências
Com o ambiente virtual ativado, instale as dependências listadas no requirements.txt:

```Bash
pip install -r requirements.txt
```

### 4. Configurar Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto (ao lado de README.md, Dockerfile, etc.) e adicione as seguintes variáveis:

```Snippet de código
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_aplicativo_ou_senha_normal
```
**EMAIL_USER:** Seu endereço de e-mail que será usado para enviar mensagens (ex: exemplo@gmail.com).
**EMAIL_PASS:** A senha do seu e-mail. Para provedores como o Gmail, você provavelmente precisará gerar uma "senha de aplicativo" específica para o Flask-Mail, devido às políticas de segurança. 
***Consulte a documentação do seu provedor de e-mail sobre como gerar uma senha de aplicativo, se necessário.***

### 5. Executar a Aplicação Flask
Certifique-se de que seu ambiente virtual está ativado e que você está na raiz do projeto.
Defina a variável de ambiente FLASK_APP e execute o servidor:

```Bash
# No Linux/macOS:
export FLASK_APP=src/app.py
flask run --host=0.0.0.0 --port=8082

# No Windows (CMD):
set FLASK_APP=src/app.py
flask run --host=0.0.0.0 --port=8082

# No Windows (PowerShell):
$env:FLASK_APP="src/app.py"
flask run --host=0.0.0.0 --port=8082
```
A aplicação estará disponível em http://localhost:8082.

## Configuração e Execução (com Docker)
Para executar o projeto usando Docker, você precisa ter o Docker instalado em sua máquina.

### 1. Construir a Imagem Docker
Na raiz do projeto (onde o Dockerfile está), execute:

```Bash
docker build -t my-portfolio .
```
Isso irá construir a imagem Docker chamada my-portfolio.

### 2. Rodar o Contêiner Docker
Execute o contêiner, mapeando a porta 8082 do contêiner para a porta 8082 da sua máquina e passando as variáveis de ambiente:

```Bash
docker run -p 8082:8080 -e EMAIL_USER="seu_email@gmail.com" -e EMAIL_PASS="sua_senha_de_aplicativo" my-portfolio
```
* Substitua "seu_email@gmail.com" e "sua_senha_de_aplicativo" pelos seus dados reais.

* **Nota:** O Dockerfile expõe a porta 8080. O -p 8082:8080 mapeia a porta 8082 da sua máquina para a porta 8080 do contêiner.

A aplicação estará disponível em http://localhost:8082.

## Tecnologias Utilizadas
#### **Backend:** <!-- Python, Flask, Flask-Mail, python-dotenv -->
<div> 
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&amp;logo=python&amp;logoColor=white" alt="python">  
  <img src="https://img.shields.io/badge/Flask-bdbcbc?style=for-the-badge&amp;logo=flask&amp;logoColor=black" alt="flask">  
</div>

#### **Frontend:** <!-- HTML5, CSS3, JavaScript -->
<div> 
  <img src="https://img.shields.io/badge/HTML5-Ec6231?style=for-the-badge&amp;logo=html5&amp;logoColor=white" alt="html"> 
  <img src="https://img.shields.io/badge/CSS3-663399?style=for-the-badge&amp;logo=css3&amp;logoColor=white" alt="css"> 
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&amp;logo=javascript&amp;logoColor=F7DF1E" alt="javascript"> 
</div>

#### **Ferramentas:**<!--  Docker, Git -->
<div> 
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&amp;logo=docker&amp;logoColor=white" alt="docker"> 
</div>

## Contribuição
Contribuições são bem-vindas! Se você tiver sugestões ou melhorias, por favor, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença
MIT License

## Contato
Matheus Nascimento Silva

LinkedIn: https://www.linkedin.com/in/matheuznsilva/

GitHub: https://github.com/matheuznsilva