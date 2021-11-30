<?php

require("modelGlobal.php");


function getCoursesInfo()
{
      header('Access-Control-Allow-Origin: *');
      header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
      header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
      header("Content-type:application/json");
    $db = dbConnect();
    $req = $db->query('SELECT * FROM courses_info');
    $data = $req->fetchAll();

    echo json_encode($data);
}
getCoursesInfo();
