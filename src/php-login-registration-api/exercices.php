<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
}

// INCLUDING DATABASE AND MAKING OBJECT
require __DIR__.'/classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

// GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

// IF REQUEST METHOD IS NOT POST
if($_SERVER["REQUEST_METHOD"] != "POST"):
    $returnData = msg(0,404,'Page Not Found!');
/*
// CHECKING EMPTY FIELDS
elseif(!isset($data->currentEmail)
    || !isset($data->currentExperience)
    || !isset($data->addExp)
    || !isset($data->currentModules)
    || !isset($data->modulesId)
    || !isset($data->positionModules)

    || empty(trim($data->currentEmail))
    || empty(trim($data->currentExperience))
    || empty(trim($data->addExp))
    || empty(trim($data->currentModules))
    || empty(trim($data->modulesId))
    || empty(trim($data->positionModules))
    ):

    $fields = ['fields' => ['currentEmail','currentExperience','addExp', 'currentModules', 'modulesId', 'positionModules']];
    $returnData = msg(0,422,'Please Fill in all Required Fields!',$fields);
*/
// IF THERE ARE NO EMPTY FIELDS THEN-
else:

    $id = trim($data->modulesId);
    $email = trim($data->currentEmail);
    $currentExp = trim($data->currentExperience);
    $addExp = trim($data->addExp);
    $currentModules = trim($data->currentModules);
    $positionModules = trim($data->positionModules);
    $currentPosition = trim($data->currentPosition);

    if ($currentPosition > $positionModules){
      $positionModules = $currentPosition;
    }
    else{
      $positionModules = $positionModules + 1;
    }

    if($id == 1){

      $req = $conn->prepare('UPDATE user SET last_module_html= :last_module, experience= :newExp, modules_completed= :completed WHERE email= :currentEmail');
      $req->execute(array(
      'last_module' => $positionModules,
      'newExp' => $currentExp + $addExp,
      'completed' => $currentModules + 1,
      'currentEmail' => $email,
    ));
    }
    else if($id == 2){

      $req = $conn->prepare('UPDATE user SET last_module_css= :last_module, experience= :newExp, modules_completed= :completed WHERE email= :currentEmail');
      $req->execute(array(
      'last_module' => $positionModules,
      'newExp' => $currentExp + $addExp,
      'completed' => $currentModules +1,
      'currentEmail' => $email,
    ));
    }
    else if($id == 3){

      $req = $conn->prepare('UPDATE user SET last_module_php= :last_module, experience= :newExp, modules_completed= :completed WHERE email= :currentEmail');
      $req->execute(array(
      'last_module' => $positionModules,
      'newExp' => $currentExp + $addExp,
      'completed' => $currentModules +1,
      'currentEmail' => $email,
    ));
    }
    else if($id == 4){

      $req = $conn->prepare('UPDATE user SET last_module_js= :last_module, experience= :newExp, modules_completed= :completed WHERE email= :currentEmail');
      $req->execute(array(
      'last_module' => $positionModules,
      'newExp' => $currentExp + $addExp,
      'completed' => $currentModules +1,
      'currentEmail' => $email,
    ));
    }
    else if($id == 5){

      $req = $conn->prepare('UPDATE user SET last_module_sql= :last_module, experience= :newExp, modules_completed= :completed WHERE email= :currentEmail');
      $req->execute(array(
      'last_module' => $positionModules,
      'newExp' => $currentExp + $addExp,
      'completed' => $currentModules +1,
      'currentEmail' => $email,
    ));
    }
    else if($id == 6){

      $req = $conn->prepare('UPDATE user SET last_module_py= :last_module, experience= :newExp, modules_completed= :completed WHERE email= :currentEmail');
      $req->execute(array(
      'last_module' => $positionModules,
      'newExp' => $currentExp + $addExp,
      'completed' => $currentModules +1,
      'currentEmail' => $email,
    ));
    }


endif;

echo json_encode($returnData);
