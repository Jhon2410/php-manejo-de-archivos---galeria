<?php
$respueta = Array();
foreach (glob("./uploads/*") as $filename) { 
        array_push($respueta, $filename);
}


echo json_encode($respueta)
?>
