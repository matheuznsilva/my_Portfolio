import os

class Config:
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USERNAME = os.getenv('EMAIL_USER')
    MAIL_PASSWORD = os.getenv('EMAIL_PASS')
    MAIL_USE_SSL = True
    MAIL_DEFAULT_SENDER = os.getenv('EMAIL_USER')
    ADMIN_EMAIL = 'matheuznsilva@gmail.com' # Endereço de email do destinatário