<?php

header('Content-Type: application/json');

$pdo = new PDO('mysql:host=localhost;dbname=localhost', 'localhost', 'sua_senha_aqui');
$stmt = $pdo->query('SELECT name, count FROM users ORDER BY count DESC LIMIT 10');
$ranking = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($ranking);
?>