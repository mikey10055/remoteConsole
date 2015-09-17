<?php

  if (isset($_POST['log'])){
    $log = file_get_contents('log.txt');

    if (strlen($log) > strlen($_POST['log']) ) {

      echo nl2br($log);
    } else {
      echo false;
    }

  }



?>
