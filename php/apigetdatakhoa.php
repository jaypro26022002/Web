 <?php     
		require_once("server.php");
        $mang=array();     
        $sql=mysqli_query($conn,"select makhoa,tenkhoa from khoa"); 
		while($rows=mysqli_fetch_array($sql))
        {       
            $usertemp['makhoa']=$rows['makhoa'];
			$usertemp['tenkhoa']=$rows['tenkhoa'];          
            array_push($mang,$usertemp);
        }     
        $jsonData['items'] =$mang;
        echo json_encode($jsonData);
		mysqli_close($conn);
		
?>