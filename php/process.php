<?php
session_start();
if( $_FILES['photo'])
{
$filename = md5(mt_rand());
$extension=str_replace('image/', '.', $_FILES['photo']['type']);
//$status = (boolean) move_uploaded_file($_FILES['photo']['tmp_name'], '../file/'.$filename.$extension);
$status = (boolean) move_uploaded_file($_FILES['photo']['tmp_name'], 'C:/wamp64/www/quanlydiemsv/file/'.$filename.$extension);

$response = (object) [
	'status' => $status
];

if ($status) {
	$response->url = 'http://localhost:3000/quanlydiemsv/file/'.$filename.$extension;
	$response->attach =$filename.$extension;
}

echo json_encode($response);
}
?>