<?php

function debug($data) {
  $debugOut = fopen('debug.txt', 'a');
  fwrite($debugOut, $data);
  fwrite($debugOut, "\n");
  fclose($debugOut);
}

function sendMail($name, $sequence, $random) {
  $titleText = "DexApp Results: " . $name . " " . $sequence . "/" . $random;
  $emailText = "User " . $name . " has submitted their scores using the Dex App.\n\nSequence high score: " . $sequence . "\nRandom high score: " . $random;
  mail("appresults@jonathanstevens.net", $titleText, $emailText);
}

# Check if the name or both scores are empty, if so this is a false submission 
if (empty($_POST['name'])) {
  debug("name empty");
  header("Location: index.html");
}

if (empty($_POST['sequenceScore']) && empty($_POST['randomScore'])) {
  debug("both scores empty");
  header("Location: index.html");
}

$name = $_POST['name'];
$sequence = $_POST['sequenceScore'];
$random = $_POST['randomScore'];

sendMail($name, $sequence, $random);
header("Location: index.html");
