<?php

require_once "lib/mail.php";
require_once "lib/amocrmapi.php";

function send($email,$title,$body) {
  $key = '2d3232djnde__Dde3DJDnjcv9_32dD';
  $request = array('key'=>$key,'email' => $email,'title' => $title, 'body' => $body, 'lang' => 'en');
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL,'https://my.stronglaser.ru/amo/send.php');
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($request));  //Post Fields
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  $result = json_encode(curl_exec($ch));
  curl_close ($ch);
}

header('Content-Type: text/html; charset=utf-8');

$myemail = 'ipacmanx@gmail.com';
$landname = 'Заявка с сайта';

$fio = addslashes($_POST['fio']);
$fio = htmlspecialchars($fio);
$fio = stripslashes($fio);
$fio = trim($fio);

$tel = addslashes($_POST['tel']);
$tel = htmlspecialchars($tel);
$tel = stripslashes($tel);
$tel = trim($tel);

$email = addslashes($_POST['email']);
$email = htmlspecialchars($email);
$email = stripslashes($email);
$email = trim($email);

$pattern = '/[a-z0-9._\-\+]+@[a-z0-9\-]+\.([a-z]{2,3})(?:\.[a-z]{2})?/i';
preg_match_all($pattern, $email, $matches);
$match_email = @$matches[0][0];

$message = addslashes($_POST['message']);
$message = htmlspecialchars($message);
$message = stripslashes($message);
$message = trim($message);

$gid = @$_POST['gid'];

if ( count($_POST) > 0 && (empty($tel))) {
  die("Phone empty");
} elseif (count($_POST) > 0) {
  //Отправка письма

  $mes = "teslalasers.com<ul><li>Имя: $fio</li><li>Телефон: $tel</li><li>Email: $email</li><li>Сообщение: $message</li></ul>";
  $to = "sale.lasermaze@gmail.com";//Ваш e-mail адрес
  $from = "noreply@teslalasers.ru";
  $sub = 'Заявка с teslalasers.ru '.date('d-m-Y H:i');

  $mail = new Mail($from); // E-mail адрес
  $mail->setFromName($landname); // Устанавливаем имя в обратном адресе
  if (!$mail->send($to, $sub, $mes))
    echo "<h2>Email not valid</h2>";

  // mail($to, $sub, $mes, $headers);

  $amo = new AmocrmApi();
  $amo->auth();

  $code = file_get_contents('http://tesla.flexcrm.ru/admin/api/ga?id='.$gid);

  $send['request']['leads']['add'] = array(
  	array(
  		'name' => 'Новая заявка с TeslaLasers',
  		'custom_fields'=>array(
  			array(
  				'id'=>1007598,
  				'values'=>array(
  					array(
  						'value' => 'Тел/Email:'.$tel.' '.$email
  					)
  				)
  			),
  			array(
  				'id'=>1003066,
  				'values'=>array(
  					array(
  						'value' => $tel
  					)
  				)
  			),
  			array(
  				'id'=>1003068,
  				'values'=>array(
  					array(
  						'value' => $email
  					)
  				)
  			),
  			array(
  				'id'=>1284500,
  				'values' => array(
  					array('value' => 2957136)
  				)
  			),
  			array(
  				'id'=>1005204,
  				'values'=>array(
  					array('value' => 2283954)
  				)
  			),
  			array(
  				'id'=>1006022,
  				'values'=>array(
  					array('value' => 2962196)
  				)
  			),
  			array(
  				'id'=>1282080,
  				'values'=>array(
  					array('value' => $code)
  				)
  			),
  			array(
  				'id'=>1288988,
  				'values'=>array(
  					array('value'=>$gid)
  				)
  			)
  		)
  	)
  );
  $lead = $amo->send('POST','/leads/set',$send);
  $lead = json_decode($lead);
  $lead = @$lead->response->leads->add[0]->id;

  $send['request']['contacts']['add'] = array(
  	array(
  		'name' => $fio,
  		'linked_leads_id' => array(
  			$lead
  		),
      'custom_fields' => array(
        array( //Телефон
          'id' => 1003066,
          'values'=> array(
            array(
              'enum' => 2279030,
              'value' => @$tel
            )
          )
        ),
        array( //Email
          'id' => 1003068,
          'values'=> array(
            array(
              'enum' => 2279042,
              'value' => @$email
            )
          )
        )
      )
  	)
  );
  $contact = $amo->send('POST','/contacts/set',$send);

  $send['request']['notes']['add'] = array(
  	array(
  		'element_id' => $lead,
  		'element_type' => 2,
  		'note_type' => 4,
  		'text' => 'Сообщение: '.$message
  	),
  	array(
  		'element_id' => $lead,
  		'element_type' => 2,
  		'note_type' => 4,
  		'text' => 'Страница: http://teslalasers.com'
  	)
  );
  $notes = $amo->send('POST','/notes/set',$send);

  if (empty($lead))
    $lead = 999;

  if (!empty($match_email))
    send($match_email,'LaserMaze Presentation #'.$lead,'english');
}

?>
<span class="fa fa-close btn-close"></span>
<h2>Thank you!</h2>
<div class="result">
We'll contact you as soon as possible.
</div>
