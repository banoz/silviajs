<!DOCTYPE HTML>
<html>
<body>
<h3>Updating</h3>
<?php
chdir("..");
echo "<h4>git pull</h4>\n";
$output = shell_exec("git pull 2>&1");
echo "<pre>$output</pre>\n";
?>
</body>
</html>
