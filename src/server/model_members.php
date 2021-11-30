<?php
function dbConnect()
{
    try
    {
        $db = new PDO('mysql:host=localhost;dbname=01academie;charset=utf8', 'root', '',array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        return $db;
    }
    catch(Exception $e)
    {
        die('Erreur : '.$e->getMessage());
    }
}


function getEmail()
{
    $db = dbConnect();
    $req = $db->prepare('SELECT email FROM user WHERE pseudo = ?');
    $req->execute(array($_SESSION['pseudo']));
    $reqEmail = $req->fetch();
    return $reqEmail;
}

function getDateSign()
{
    $db = dbConnect();
    $req = $db->prepare('SELECT signup_date FROM user WHERE pseudo = ?');
    $req->execute(array($_SESSION['pseudo']));
    $reqDate = $req->fetch();
    return $reqDate;
}
