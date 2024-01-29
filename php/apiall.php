 <?php  

		require_once("server.php");
        $event=$_GET["event"]; //event từ client gửi lên để biết server cần thực vấn đề gì trong tập api
    switch ($event){
    case "getALLDataBoMon":
        $mang=array();
        
        $sql=mysqli_query($conn,"select mabm,tenbm from bomon"); 
		while($rows=mysqli_fetch_array($sql))
        {
         
            $usertemp['mabm']=$rows['mabm'];
			$usertemp['tenbm']=$rows['tenbm'];
           
            array_push($mang,$usertemp);
        }
       
        $jsonData['items'] =$mang;
        echo json_encode($jsonData);
		mysqli_close($conn);
        break;
    case "getNganhPhanTrang":
        $mang=array();
        $record=$_GET['record']; //số dòng cần lấy
        $page=$_GET['page'];//số trang mà client gửi lên
	
		$vt=$page*$record; //tính toán lại vi trị cần lấy
        $limit='limit '.$vt.' , '.$record;
        $search=$_GET["search"];
        $sql=mysqli_query($conn,"select n.manganh,n.tennganh,n.nambatdau,n.mabm,bm.tenbm from bomon bm, nganh n where n.mabm=bm.mabm and (n.manganh like '%".$search."%' or n.tennganh like '%".$search."%') order by manganh asc ".$limit); 
		while($rows=mysqli_fetch_array($sql))
        {
         
            $usertemp['manganh']=$rows['manganh'];
			$usertemp['tennganh']=$rows['tennganh'];
            $usertemp['nambatdau']=$rows['nambatdau'];
            $usertemp['mabm']=$rows['mabm'];
            $usertemp['tenbm']=$rows['tenbm'];
            array_push($mang,$usertemp);
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from bomon bm, nganh n where n.mabm=bm.mabm and (n.manganh like '%".$search."%' or n.tennganh like '%".$search."%') order by manganh asc ");
        $row=mysqli_fetch_array($rs);
        $jsonData['total'] =(int)$row['total'];
		$jsonData['totalpage'] =ceil($row['total']/$record);
	    $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
        echo json_encode($jsonData);
		mysqli_close($conn);
        break;
    case "deleteNganh":
        $manganh=$_GET['manganh'];	 
        $sql="delete from nganh WHERE manganh='".$manganh."'";   
            if (mysqli_query($conn, $sql)) {  //thực thi câu truy vấn
				if(mysqli_affected_rows($conn)>0){ //đảm bảo dữ liệu có thay đổi
					
					$res["success"] = 1;// {"success":1} //trả về client đối tượng json 
				}
				else{
					$res["success"] = 0;//{"success":0}//trả về client đối tượng json 
				}
            } else {
                $res["success"] = 0;// {"success":0}//trả về client đối tượng json 
            }
        
        echo json_encode($res); 
        mysqli_close($conn);
        break;
    case "insertNganh":
    	$manganh=$_GET['manganh'];
		$tennganh=$_GET['tennganh'];   
        $nambatdau=$_GET['nambatdau'];   
        $mabm=$_GET['mabm'];  
        $sql="INSERT INTO `nganh`(`manganh`, `tennganh`,nambatdau,mabm) VALUES ('".$manganh."','".$tennganh."','".$nambatdau."','".$mabm."')";
      
       
            if (mysqli_query($conn, $sql)) {  //thực thi câu truy vấn
				if(mysqli_affected_rows($conn)>0){ //đảm bảo dữ liệu có thay đổi
					
					$res["success"] = 1;// {"success":1} //trả về client đối tượng json 
				}
				else{
					$res["success"] = 0;//{"success":0}//trả về client đối tượng json 
				}
            } else {
                $res["success"] = 0;// {"success":0}//trả về client đối tượng json 
            }
        
        echo json_encode($res); 
        mysqli_close($conn);
        break;
    case "updateNganh":
        $manganh=$_GET['manganh'];
		$tennganh=$_GET['tennganh'];   
        $nambatdau=$_GET['nambatdau'];   
        $mabm=$_GET['mabm'];  
        $sql="update `nganh` set tennganh='".$tennganh."', nambatdau='".$nambatdau."',mabm='".$mabm."' where manganh='".$manganh."'";
      
       
            if (mysqli_query($conn, $sql)) {  //thực thi câu truy vấn
				if(mysqli_affected_rows($conn)>0){ //đảm bảo dữ liệu có thay đổi
					
					$res["success"] = 1;// {"success":1} //trả về client đối tượng json 
				}
				else{
					$res["success"] = 0;//{"success":0}//trả về client đối tượng json 
				}
            } else {
                $res["success"] = 0;// {"success":0}//trả về client đối tượng json 
            }
        
        echo json_encode($res); 
        mysqli_close($conn);
        break;
        default:
        break;
    }
		
?>