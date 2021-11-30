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
elseif(!isset($data->name)
    || !isset($data->currentName)
    || empty(trim($data->name))
    || empty(trim($data->currentName))
    ):

    $fields = ['fields' => ['pseudo']];
    $returnData = msg(0,422,'Remplissez tous les champs !',$fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else:

    $name = trim($data->name);
    $currentName = trim($data->currentName);

    if(strlen($name) < 3):
        $returnData = msg(0,422,'Votre pseudo doit comporter au minimum 3 characters !');

    else:
        try{

            $check_pseudo = "SELECT `pseudo` FROM `user` WHERE `pseudo`=:pseudo";
            $check_pseudo_stmt = $conn->prepare($check_pseudo);
            $check_pseudo_stmt->bindValue(':pseudo', $name,PDO::PARAM_STR);
            $check_pseudo_stmt->execute();

            if($check_pseudo_stmt->rowCount()):
                $returnData = msg(0,422, 'Ce Pseudo est deja utilisée !');

            else:

              $req = $conn->prepare('UPDATE user SET pseudo= :pseudo WHERE pseudo= :currentPseudo');
              $req->execute(array(
              'pseudo' => htmlspecialchars(strip_tags($name)),
              'currentPseudo' => $currentName
            ));

                $returnData = msg(1,201,'Opération réussi avec succés !');

            endif;

        }

        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }
    endif;

endif;

echo json_encode($returnData);
