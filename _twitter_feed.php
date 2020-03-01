<?php
/*
Twitter feed authorisation script
(c) Web factory Ltd, 2013

Due to new Twitter API rules you have to create an application in order to show custom Twitter feeds. The process is very simple and free.
Go to https://dev.twitter.com/ and login with your Twitter account (any account will do). Click "My applications" under your account's avatar and then click "Create a new application". Application details are really not important, just fill them in. After the app is created click "Create my access token" (blue button on the page bottom) and copy/paste 4 strings in appropriate variables below. Please mind the single quotes; they have to be around the string.

Please note that this only sets up the Twitter feed authorization. You still need to open /js/common.js, find the Twiter feed init script (just search for "tweet" string in the file) and set the Twitter account you want to show, as well as set other options if the default ones don't fit your needs.
*/

// Consumer key - found under "OAuth settings" in Twitter application details
$consumer_key = 'SET THE 4 VARIABLES AND PLEASE MIND THE SINGLE QUOTES';

// Consumer secret - found under "OAuth secret" in Twitter application details
$consumer_secret = '';

// Access token - found under "Your access token" in Twitter application details
$access_token = '';

// Access token secret - found under "Your access token" in Twitter application details
$access_token_secret = '';

?>