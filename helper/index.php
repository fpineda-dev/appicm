<?php
$conn = new mysqli("","","","");
$sql="INSERT INTO `departments` (`name`, `id_organization`) VALUES ('Iglesia Infantil', 1);";
if($conn->query($sql)) {
    echo "value inserted";
} else{
    echo "insertion failed";
}
$sql="SELECT * FROM `departments`";
$result=$conn->query($sql);
if ($result->num_rows>0) {
    echo "<table boder=1";
    echo "<tr><th>name</th><th>id_organization</th></tr>";
    while ($row=$result->fetch_assoc()) {
        echo "<tr><td>".$row['id_department']."</td><td>".$row['name']."</td></tr>";
    }
    echo "</table>";
} else {
    echo "0 rows available";
}

$conn->close();
?>