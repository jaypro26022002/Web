 <?php     
		require_once("server.php");
    
        $mang=array();
        $mabm=$_GET["mabm"];
        $sql=mysqli_query($conn,"select manganh,tennganh,nambatdau,n.mabm,tenbm from nganh n, bomon b where n.mabm=b.mabm and n.mabm='".$mabm."'"); 
		while($rows=mysqli_fetch_array($sql))
        {
         
            $usertemp['manganh']=$rows['manganh'];
			$usertemp['tennganh']=$rows['tennganh'];
            $usertemp['nambatdau']=$rows['nambatdau'];
            $usertemp['mabm']=$rows['mabm'];
            array_push($mang,$usertemp);
        }
       
        $jsonData['items'] =$mang;
        echo json_encode($jsonData);
		mysqli_close($conn);
		
?>