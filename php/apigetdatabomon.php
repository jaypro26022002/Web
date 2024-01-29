 <?php     
		require_once("server.php");
    
        $mang=array();
        $search=$_GET["search"];
        $sql=mysqli_query($conn,"select mabm,tenbm from bomon where (mabm like '%".$search."%' or tenbm like '%".$search."%') order by mabm asc "); 
		while($rows=mysqli_fetch_array($sql))
        {
         
            $usertemp['mabm']=$rows['mabm'];
			$usertemp['tenbm']=$rows['tenbm'];
           
            array_push($mang,$usertemp);
        }
       
        $jsonData['items'] =$mang;
        echo json_encode($jsonData);
		mysqli_close($conn);
		
?>