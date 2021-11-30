<?php

require("modelGlobal.php");


function getModules()
{
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
  header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
  header("Content-type:application/json");
    $db = dbConnect();

    $req = $db->query('SELECT * FROM modules');
    $data = $req->fetchAll();


    echo json_encode($data);
}
getModules();
