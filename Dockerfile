# Use uma imagem oficial do Python como base
FROM python:3.12-slim

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo de requisitos (requirements.txt) para o container
COPY requirements.txt /app/

# Instala as dependências do projeto
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo o conteúdo do seu projeto para o diretório de trabalho dentro do container
COPY . /app/

# Expõe a porta em que o Flask vai rodar
EXPOSE 8080

# Comando para rodar o servidor Flask
CMD ["python", "server.py"]
