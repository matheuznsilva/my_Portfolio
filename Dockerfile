# Use uma imagem oficial do Python como base
FROM python:3.12-slim

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Adiciona o diretório de trabalho ao PYTHONPATH para que o Python encontre o módulo 'src'
ENV PYTHONPATH=/app

# Copia o arquivo de requisitos (requirements.txt) para o container
COPY requirements.txt .

# Instala as dependências do projeto
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo o conteúdo do seu projeto para o diretório de trabalho dentro do container
# Copia o diretório 'src' para '/app/src'
COPY src/ ./src/
# Copia o diretório 'public' para '/app/public'
COPY public/ ./public/

# Expõe a porta em que o Flask vai rodar
EXPOSE 8080

# Comando para rodar o servidor Flask
# Note a mudança para 'src/app.py'
CMD ["python", "src/app.py"]