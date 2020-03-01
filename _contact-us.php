<?php
/*
 * Permatex - email contact script with autoresponder
 * (c) Web factory Ltd
 * www.webfactoryltd.com
**/

/* Email address on which you want to receive the contat form data */
  $myEmail = '';

/* Subject of the email you'll receive with contact form data */
  $emailSubject = 'New contact from Permatex website';

/* If you want to enable the autoresponder feature set this variable to true */
  $autorespond = false;
  
/* Subject of the autorespond email your clients will receive */
  $autorespondSubject = 'Thank you for contacting us';

/* Content/body of the autorespond email your clients will receive */
  $autorespondMsg = 'Thank you for taking the time to contact us. We will respond to your inquery ASAP.

Have a great day,
the Permatex team';


/**** DO NOT EDIT BELOW THIS LINE ****/
/**** DO NOT EDIT BELOW THIS LINE ****/
  ob_start();

  function response($responseStatus, $responseMsg) {
    $out = json_encode(array('responseStatus' => $responseStatus, 'responseMsg' => $responseMsg));

    ob_end_clean();
    die($out);
  }

  // only AJAX calls are allowed
  if (!isset($_SERVER['X-Requested-With']) && !isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
    response('err', 'ajax');
  }

  // prepare headers
  $headers  = "MIME-Version: 1.0\n";
  $headers .= "Content-type: text/plain; charset=UTF-8\n";
  $headers .= "X-Mailer: PHP " . PHP_VERSION . "\n";
  $headers .= "From: {$myEmail}\n";
  $headers .= "Return-Path: {$myEmail}";

  // construct the message
  $tmp = date('r');
  $message = "The form was submited from {$_SERVER["HTTP_HOST"]} on $tmp by a person who's IP is: {$_SERVER['REMOTE_ADDR']}\n";
  foreach ($_POST as $field => $value) {
    if ($field[0] == '_') {
      continue;
    }
    $message .= $field . ': ' . $value . "\n";
  }
  $message .= "\nHave a good one!";


  if (@mail($myEmail, $emailSubject, $message, $headers)) {
    if ($autorespond) {
      @mail($_POST['email'], $autorespondSubject, $autorespondMsg, $headers);
    }
    response('ok', 'sent');
  } else {
    response('err', 'notsent');
  }

  response('err', 'undefined');
?>