 <?php     
		require_once("server.php");
        $mang=array();     
        $sql=mysqli_query($conn,"select macv,tencv from chucvu"); 
		while($rows=mysqli_fetch_array($sql))
        {       
            $usertemp['macv']=$rows['macv'];
			$usertemp['tencv']=$rows['tencv'];          
            array_push($mang,$usertemp);
        }     
        $jsonData['items'] =$mang;
        echo json_encode($jsonData);
		mysqli_close($conn);
		
?>