<?php

header('Content-Type: application/json');

$name = $_POST['name'] ?? '';
if (empty($name)) {
    http_response_code(400);
    echo json_encode(['error' => 'Nome é obrigatório']);
    exit;
}

$pdo = new PDO('mysql:host=localhost;dbname=localhost', 'localhost', 'sua_senha_aqui');
$stmt = $pdo->prepare('SELECT count FROM users WHERE name = ?');
$stmt->execute([$name]);
$user = $stmt->fetch();

if (!$user) {
    $stmt = $pdo->prepare('INSERT INTO users (name, count) VALUES (?, 0)');
    $stmt->execute([$name]);
    echo json_encode(['count' => 0]);
} else {
    echo json_encode(['count' => $user['count']]);
}
?>
