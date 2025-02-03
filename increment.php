<?php

header('Content-Type: application/json');

$name = $_POST['name'] ?? '';
if (empty($name)) {
    http_response_code(400);
    echo json_encode(['error' => 'Nome é obrigatório']);
    exit;
}

$pdo = new PDO('mysql:host=localhost;dbname=localhost', 'localhost', 'sua_senha_aqui');
$stmt = $pdo->prepare('UPDATE users SET count = count + 1 WHERE name = ?');
$stmt->execute([$name]);

$stmt = $pdo->prepare('SELECT count FROM users WHERE name = ?');
$stmt->execute([$name]);
$user = $stmt->fetch();

echo json_encode(['count' => $user['count']]);
?>