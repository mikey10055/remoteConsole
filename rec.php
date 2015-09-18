<?php

  print_r($_POST);

$file = 'log.txt';

if (!file_exists($file)){
  $content = "File Created\r\n";
  $fp = fopen($file,"wb");
  fwrite($fp,$content);
  fclose($fp);
}

$current = file_get_contents($file);

$current .= $_POST['timesent'] . ',' . $_POST['message'] . ',' . $_POST['type'] . ',' . $_POST['ln'] . "\r\n";

file_put_contents($file, $current);
?>


?>
