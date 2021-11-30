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

$data = json_decode(file_get_contents("php://input"));
$returnData = [];


// IF REQUEST METHOD IS NOT POST
if($_SERVER["REQUEST_METHOD"] != "POST"):
    $returnData = msg(0,404,'Page Not Found!');

// CHECKING EMPTY FIELDS
elseif(!isset($data->currentPassword)
    || !isset($data->currentEmail)
    || !isset($data->newPassword)
    || empty(trim($data->currentPassword))
    || empty(trim($data->currentEmail))
    || empty(trim($data->newPassword))
    ):

    $fields = ['fields' => ['newPassword','currentPassword']];
    $returnData = msg(0,422,' Remplissez tous les champs !',$fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else:

    $currentPassword = trim($data->currentPassword);
    $currentEmail = trim($data->currentEmail);
    $newPassword = trim($data->newPassword);

    if(strlen($newPassword) < 8):
        $returnData = msg(0,422,'Votre Mot de Passe doit comporter 8 characters !');


  else:

      try{

        $fetch_user_by_email = "SELECT * FROM `user` WHERE `email`=:currentEmail";
        $query_stmt = $conn->prepare($fetch_user_by_email);
        $query_stmt->bindValue(':currentEmail', $currentEmail,PDO::PARAM_STR);
        $query_stmt->execute();

        if($query_stmt->rowCount()):
            $row = $query_stmt->fetch(PDO::FETCH_ASSOC);
            $check_password = password_verify($currentPassword, $row['password']);

            if($check_password):

              $mdp_hache = password_hash($newPassword, PASSWORD_DEFAULT);

              $req = $conn->prepare('UPDATE user SET password= :password WHERE email= :currentEmail');
              $req->execute(array(
              'password' => $mdp_hache,
              'currentEmail' => $currentEmail
            ));

                $returnData = msg(1,201,'Opération réussi avec succés !');

              else:
                $returnData = msg(0,422,"Mot de Passe incorrect !");
            endif;

          else:
            $returnData = msg(0,422,"Une erreur innatendue s'est produite, veuillez réessayer");


          endif;

      }

      catch(PDOException $e){
          $returnData = msg(0,500,$e->getMessage());
      }
  endif;

endif;


echo json_encode($returnData);
