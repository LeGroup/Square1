Square1
=======

Database structure:
Import structure from the SQL file in database directory.

Database connection:
Create db.php file to the project directory. Contents of the file:

```php
<?php
	$host = 'mysql host';
	$user = 'mysql username';
	$pass = 'mysql password';
	$db = new PDO('mysql:host='.$host.';dbname=square1', $user, $pass); 
?>
```