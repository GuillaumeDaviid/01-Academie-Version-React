<?php
if(!isset($_SESSION))
{
    session_start();
}

header ("Content-type: image/png");
$image = imagecreate(53,45);


$rand = rand(0, 255);

$color = imagecolorallocate($image, 255, 189, 0);
$white = imagecolorallocate($image, 255, 255,255);

$pseudo = $_SESSION['pseudo'];
$pseudoUpper = strtoupper($pseudo);
$firstLetter = substr($pseudoUpper, 0, 1);

imagestring($image, 5, 23, 15, $firstLetter, $white);


imagepng($image);
?>
