 <?php     
		require_once("server.php");
    
        $mang=array();
        $manganh=$_GET["manganh"];
        $sql=mysqli_query($conn,"select malop,tenlop,n.manganh,n.tennganh  from nganh n, lop l where n.manganh=l.manganh and l.manganh='".$manganh."'"); 
		while($rows=mysqli_fetch_array($sql))
        {
         
            $usertemp['manganh']=$rows['manganh'];
			$usertemp['tennganh']=$rows['tennganh'];
            $usertemp['tenlop']=$rows['tenlop'];
            $usertemp['malop']=$rows['malop'];
            array_push($mang,$usertemp);
        }
       
        $jsonData['items'] =$mang;
        echo json_encode($jsonData);
		mysqli_close($conn);
		
?>