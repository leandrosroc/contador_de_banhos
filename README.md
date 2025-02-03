# Contador de Banhos 🚿

Um aplicativo web minimalista para rastrear banhos e criar um ranking entre usuários. Desenvolvido com PHP, MySQL, HTML, CSS e JavaScript puro.

## 📋 Funcionalidades

- Sistema de login simplificado (apenas nome)
- Contador individual de banhos
- Ranking em tempo real dos usuários
- Design responsivo e minimalista
- Medalhas para os top 3 usuários

## 🛠️ Tecnologias Utilizadas

- Frontend:
  - HTML5
  - CSS3 (Design responsivo)
  - JavaScript (Vanilla)
- Backend:
  - PHP 7+
  - MySQL/MariaDB
- Ícones e Visual:
  - SVG para ícone de chuveiro
  - Emojis para medalhas (🥇, 🥈, 🥉)

## ⚙️ Pré-requisitos

- Servidor Web (Apache/Nginx)
- PHP 7.0 ou superior
- MySQL 5.7 ou superior
- PDO PHP Extension

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/leandrosroc/contador_de_banhos.git
cd contador_de_banhos
```

2. Configure o banco de dados:
```sql
-- Execute o script SQL no seu MySQL
CREATE DATABASE IF NOT EXISTS shower_counter;
USE shower_counter;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_shower_at TIMESTAMP NULL DEFAULT NULL,
    INDEX idx_count (count),
    INDEX idx_name (name)
);

-- Crie um usuário para o banco (altere a senha)
CREATE USER IF NOT EXISTS 'shower_user'@'localhost' IDENTIFIED BY 'sua_senha_aqui';
GRANT ALL PRIVILEGES ON shower_counter.* TO 'shower_user'@'localhost';
FLUSH PRIVILEGES;
```

3. Configure as credenciais do banco:
   - Abra os arquivos PHP (login.php, increment.php, ranking.php)
   - Atualize as credenciais do PDO:
```php
$pdo = new PDO('mysql:host=localhost;dbname=shower_counter', 'shower_user', 'sua_senha_aqui');
```

4. Configure o servidor web:
   - Copie os arquivos para seu diretório web
   - Configure as permissões adequadas:
```bash
chmod 755 -R /var/www/contador_de_banhos
```

## 🚀 Uso

1. Acesse a aplicação pelo navegador
2. Digite seu nome para entrar
3. Use o botão "+1 Banho" para registrar um banho
4. Acompanhe sua posição no ranking

## 📁 Estrutura de Arquivos

```
contador_de_banhos/
├── styles.css        # Estilos da aplicação
├── index.html        # Frontend principal
├── login.php         # Endpoint de login
├── increment.php     # Endpoint de incremento
├── ranking.php       # Endpoint do ranking
└── README.md         # Este arquivo
```

## 🔒 Segurança

- Todos os inputs são sanitizados
- Prepared Statements para queries SQL
- Validações básicas implementadas

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Notas

- Este é um projeto simples para fins educacionais
- Não possui autenticação robusta
- Pode ser expandido com features adicionais