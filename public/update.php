<!DOCTYPE HTML>
<html>
<body>
<h3>Updating</h3>
<?php
$output = shell_exec("git pull");
echo "<pre>$output</pre>";
?>
</body>
</html>
