 <?php     
		require_once("server.php");
    
        $mang=array();
        $record=$_GET['record']; //số dòng cần lấy
        $page=$_GET['page'];//số trang mà client gửi lên
	
		$vt=$page*$record; //tính toán lại vi trị cần lấy
        $limit='limit '.$vt.' , '.$record;
        $search=$_GET["search"];
        $sql=mysqli_query($conn,"select mabm,tenbm from bomon where (mabm like '%".$search."%' or tenbm like '%".$search."%') order by mabm asc ".$limit); 
		while($rows=mysqli_fetch_array($sql))
        {
         
            $usertemp['mabm']=$rows['mabm'];
			$usertemp['tenbm']=$rows['tenbm'];
           
            array_push($mang,$usertemp);
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from bomon where (mabm like '%".$search."%' or  mabm like '%".$search."%') order by mabm asc ");
        $row=mysqli_fetch_array($rs);
        $jsonData['total'] =(int)$row['total'];
		$jsonData['totalpage'] =ceil($row['total']/$record);
	    $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
        echo json_encode($jsonData);
		mysqli_close($conn);
		
?>