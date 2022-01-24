<?php
$res = Array(  //respuesta por defecto
    "success"=>false,
    "message"=>"El archivo no se pudo subir."
);
if(!isset($_FILES['file'])){ //validar si existe
    $res["message"] = "Error en el servidor el archivo no se envio correctamente.";
     echo json_encode($res);
     return;
}
if($_FILES["file"]["type"]!= "image/jpeg"){ //validar si es jpg
    $res["message"] = "la imagen". $_FILES['file']["name"]."Imagen no es jpg";
    echo json_encode($res);
    return;
}



$uploadDir = __DIR__ .'/uploads/';
$filesInput = $_FILES['file'];
$filesName = $filesInput['name'];
$filesTmpName = $filesInput['tmp_name'];
$filesError = $filesInput['error'];

foreach ((array)  $filesName as $name) {
        if ($filesError == UPLOAD_ERR_OK) {
            $toPath = $uploadDir . uniqid() . '_' . basename($name); 
            $uploaded =  move_uploaded_file($_FILES["file"]['tmp_name'], $toPath);
            if($uploaded){
                $res["success"] = true;
                $res["message"] = "Archivos subidos con exito.";
            }
            
        }
    
}

echo json_encode($res);
