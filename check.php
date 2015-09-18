<?php

  if (isset($_POST['log'])){
    $file = 'log.txt';
    $data = file($file);
    if (count($data)-1 >= 0) {
        $line = $data[count($data)-1];
        $ar = explode(',',$line);
        echo json_encode($ar);
    } else {
      echo json_encode(false);
    }


  }



?>
