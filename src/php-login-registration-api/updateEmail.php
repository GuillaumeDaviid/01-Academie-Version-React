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
elseif(!isset($data->email)
    || !isset($data->currentEmail)
    || !isset($data->password)
    || empty(trim($data->email))
    || empty(trim($data->currentEmail))
    || empty(trim($data->password))
    ):

    $fields = ['fields' => ['email','password']];
    $returnData = msg(0,422,'Remplissez tous les champs!',$fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else:

    $email = trim($data->email);
    $currentEmail = trim($data->currentEmail);
    $password = trim($data->password);

    // CHECKING THE EMAIL FORMAT (IF INVALID FORMAT)
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)):
        $returnData = msg(0,422,'Adresse invalide!');

    else:
        try{

            $check_stmt = "SELECT * FROM `user` WHERE `email`=:email";
            $check_email_stmt = $conn->prepare($check_stmt);
            $check_email_stmt->bindValue(':email', $email,PDO::PARAM_STR);
            $check_email_stmt->execute();


            if($check_email_stmt->rowCount()):
                $returnData = msg(0,422, 'Cette adresse email est deja utilisée!');
/*
            elseif(!$check_password):
              $returnData = msg(0,422, 'Mot de passe incorrect!');
*/

            else:

              $fetch_user_by_email = "SELECT * FROM `user` WHERE `email`=:email";
              $query_stmt = $conn->prepare($fetch_user_by_email);
              $query_stmt->bindValue(':email', $currentEmail,PDO::PARAM_STR);
              $query_stmt->execute();

              // IF THE USER IS FOUNDED BY EMAIL
              if($query_stmt->rowCount()):
                  $row = $query_stmt->fetch(PDO::FETCH_ASSOC);
                  $check_password = password_verify($password, $row['password']);

                  if($check_password):

                    $req = $conn->prepare('UPDATE user SET email= :email WHERE email= :currentEmail');
                    $req->execute(array(
                    'email' => $email,
                    'currentEmail' => $currentEmail
                  ));

                      $returnData = msg(1,201,'Opération réussi avec succés !');

                  else:

                    $returnData = msg(0,422, 'mot de passe invalide!');


                  endif;


             endif;



            endif;

        }

        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }
    endif;

endif;

echo json_encode($returnData);
