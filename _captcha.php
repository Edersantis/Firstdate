<?php
/*
 * Permatex - captacha anti SPAM script
 * (c) Web factory Ltd
 * www.webfactoryltd.com
**/

define('MAX_RAND_NB', 9);

/**** DO NOT EDIT BELOW THIS LINE ****/
/**** DO NOT EDIT BELOW THIS LINE ****/
  ob_start();
  session_start();

  // only AJAX calls allowed
  if (!isset($_SERVER['X-Requested-With']) && !isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
    die('0');
  }

  if (isset($_GET['generate'])) {
    $a = rand(1, MAX_RAND_NB);
    $b = rand(1, MAX_RAND_NB);

    if ($a > $b) {
      $out = "$a - $b = ";
      $_SESSION['captcha'] = $a - $b;
    } else {
      $out = "$a + $b = ";
      $_SESSION['captcha'] = $a + $b;
    }
    die($out);
  } elseif (isset($_GET['_captcha'])) {
      if($_GET['_captcha'] == $_SESSION['captcha']) {
        die('true');
      } else {
        die('false');
      }
  }

  die('0');
?>