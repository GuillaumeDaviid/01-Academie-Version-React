<?php

require('modelGlobal.php');

if (isset($_POST['pseudo']) && isset($_POST['password'])){
        $pseudo = htmlspecialchars($_POST['pseudo']);
        $db = dbConnect();
        $req = $db->prepare('SELECT id, password FROM user WHERE pseudo = :pseudo');
        $req->execute(array(
        'pseudo' => $pseudo));
        $resultat = $req->fetch();

     // Comparaison du pass envoyé via le formulaire avec la base
     $isPasswordCorrect = password_verify($_POST['password'], $resultat['password']);

    if (!$resultat)
    {
        echo 'Mauvais identifiant ou mot de passe !';
        include ('login.php');
    }
    else
    {
        if ($isPasswordCorrect) {
            session_start();
            $_SESSION['id'] = $resultat['id'];
            $_SESSION['pseudo'] = $pseudo;
            include ('localhost:3000');
            header('Location: index.php');
        }
        else {
            echo 'Mauvais identifiant ou mot de passe !';
            include ('localhost:3000');
        }
    }
}
