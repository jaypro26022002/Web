 <?php     
		require_once("server.php");
    
        $mang=array();
        $record=$_GET['record']; //số dòng cần lấy
        $page=$_GET['page'];//số trang mà client gửi lên
	
		$vt=$page*$record; //tính toán lại vi trị cần lấy
        $limit='limit '.$vt.' , '.$record;
        $search=$_GET["search"];
        $sql=mysqli_query($conn,"select masv,tensv,gt,namsinh,sv.malop,sv.makhoa,sv.macv,l.tenlop,k.tenkhoa,(select tencv from chucvu cv where cv.macv=sv.macv) as tencv from sinhvien sv, lop l,khoa k where sv.malop=l.malop and sv.makhoa=k.makhoa and (sv.masv like '%".$search."%' or sv.tensv like '%".$search."%') order by sv.masv asc ".$limit);
        	while($rows=mysqli_fetch_array($sql))
        {
         
            $usertemp['masv']=$rows['masv'];
            $usertemp['tensv']=$rows['tensv'];
			$usertemp['gt']=$rows['gt'];
            $usertemp['namsinh']=$rows['namsinh'];
            $usertemp['tenlop']=$rows['tenlop'];
            $usertemp['tenkhoa']=$rows['tenkhoa'];
            $usertemp['tencv']=$rows['tencv'];
            array_push($mang,$usertemp);
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from sinhvien sv, lop l,khoa k where sv.malop=l.malop and sv.makhoa=k.makhoa and (sv.masv like '%".$search."%' or sv.tensv like '%".$search."%') order by sv.masv asc ");
        $row=mysqli_fetch_array($rs);
        $jsonData['total'] =(int)$row['total'];
		$jsonData['totalpage'] =ceil($row['total']/$record);
	    $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
        echo json_encode($jsonData);
		mysqli_close($conn);
		
?>