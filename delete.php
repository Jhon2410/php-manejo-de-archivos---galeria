<?php
$res = Array(  //respuesta por defecto
    "success"=>false,
    "message"=>"El archivo no se pudo eliminar."
);
if(unlink($_POST["img"])){
    $res["success"]=false;
    $res["message"]="El archivo no se pudo eliminar.";
}
json_encode($res)


?>