var flagSV=0;
$(document).ready(function () {
    $("#imgSV").change(function(e) {
        console.log("ok");
      
        var files = e.target.files;
        console.log("ok"+files[0]);
    
        upload(files,function(res){
            console.log("ok"+res);
            if(JSON.parse(res).status==true){
            $(".preview").attr("src",JSON.parse(res).url);
            console.log("ok"+res);
            }else{
                $("#err").html("Error");
            }
        })
       });
    $(".btnthemsv").click(function () {
        $(".btnthemsv").prop("disabled", true);
        $(".btnsuasv").prop("disabled", true);//Mờ
        $(".btnluusv").prop("disabled", false);//mờ
        $(".txtmasv").val("");
        $(".txttensv").val("");
        $(".txtmasv").focus();
        flagSV = 1;
        /* 
         */
    })
    $(".btnsuasv").click(function () {
        $(".btnthemsv").prop("disabled", true);
        $(".btnsuasv").prop("disabled", true);//Mờ
        $(".btnluusv").prop("disabled", false);//mờ

        flagSV = 2;
        /* 
         */
    })
    //bắt sự kiện nhấn nút làm lại
    $(".btnlamlaisv").click(function () {
        $(".txtmasv").val("");
        $(".txttensv").val("");
        flagSV = 0;
        $(".btnthemsv").prop("disabled", false);//sáng
        $(".btnsuasv").prop("disabled", true);//Mờ
        $(".btnluusv").prop("disabled", true);//mờ
    });
    //sỰ KIỆN FOCUS VÀ CHANGE
    $(".cbbomonsv").on('change',function(){
        console.log($(this).val());
        showCBNganhByMaBM($(this).val());
    })
    $(".cbbomonsv").on('focus',function(){
        console.log($(this).val());
        showCBNganhByMaBM($(this).val());
    })
    $(".cbnganhsv").on('change',function(){
        console.log($(this).val());
        showCBLopByMaNganh($(this).val());
    })
    $(".cbnganhsv").on('focus',function(){
        console.log($(this).val());
        showCBLopByMaNganh($(this).val());
    });
    var pagecurrent_sv=0;
	$(".pagenumbersv").on('click','button',function () {
    
        pagecurrent_sv=$(this).val();
        showDataTableSVPage($(this).val(),record);
	})
      //xử lý nút tìm 
      $(".btntimsv").click(function () {
        // showDataTableBoMon();
        showDataTableSVPage(pagecurrent_sv,record);
     });
     //bắt sự kiện người dùng nhấn phím Enter
     $(".txttimsv").keyup(function (e) {
         if (e.which == 13) { //13: Enter
           //  showDataTableBoMon();
           showDataTableSVPage(pagecurrent_sv,record);
         }
     })
});
function showCBBoMon(){
    var datasend={
        search:""
    }
    queryData("php/apigetdatabomon.php", datasend, function (res) {
        var data=res.items;
        var ht='<option value="NULL">Chọn bộ môn</option>';
        for(var i in data){
            var d=data[i];
            ht=ht+'<option value="'+d.mabm+'">'+d.tenbm+'</option>';
        }
        $(".cbbomonsv").html(ht);
    });
}
function showCBNganhByMaBM(mabm){
    var datasend={
        mabm:mabm
    }
    queryData("php/apigetdatanganhbybomon.php", datasend, function (res) {
        var data=res.items;
        var ht='<option value="NULL">Chọn ngành</option>';
        for(var i in data){
            var d=data[i];
            ht=ht+'<option value="'+d.manganh+'">'+d.tennganh+'</option>';
        }
        $(".cbnganhsv").html(ht);
    });
}
function showCBKhoa(){
    var datasend={
        
    }
    queryData("php/apigetdatakhoa.php", datasend, function (res) {
        var data=res.items;
        var ht='<option value="NULL">Chọn Khóa học</option>';
        for(var i in data){
            var d=data[i];
            ht=ht+'<option value="'+d.makhoa+'">'+d.tenkhoa+'</option>';
        }
        $(".cbkhoasv").html(ht);
    });
}
function showCBKhoa(){
    var datasend={
        
    }
    queryData("php/apigetdatakhoa.php", datasend, function (res) {
        var data=res.items;
        var ht='<option value="NULL">Chọn Khóa học</option>';
        for(var i in data){
            var d=data[i];
            ht=ht+'<option value="'+d.makhoa+'">'+d.tenkhoa+'</option>';
        }
        $(".cbkhoasv").html(ht);
    });
}
function showCBChucVu(){
    var datasend={
        
    }
    queryData("php/apigetdatachucvu.php", datasend, function (res) {
        var data=res.items;
        var ht='<option value="NULL">Chọn Chức Vụ</option>';
        for(var i in data){
            var d=data[i];
            ht=ht+'<option value="'+d.macv+'">'+d.tencv+'</option>';
        }
        $(".cbchucvusv").html(ht);
    });
}
function showCBLopByMaNganh(manganh){
    var datasend={
        manganh:manganh
    }
    queryData("php/apigetdataloptheonganh.php", datasend, function (res) {
        var data=res.items;
        var ht='<option value="NULL">Chọn ngành</option>';
        for(var i in data){
            var d=data[i];
            ht=ht+'<option value="'+d.malop+'">'+d.tenlop+'</option>';
        }
        $(".cblopsv").html(ht);
    });
}
function showDataTableSVPage(page,record) {
    var search = $(".txttimsv").val();
    console.log("serach=" + search);
    var datasend = {
        page:page,
        record:record,
        search: search
    }
    $(".addListSV").html('<tr><td colspan="4"><img src="images/loading.gif" width="20px" height="20px">Đang tải dữ liệu</td></tr>');
      
    queryData("php/apigetdataphantrangsinhvien.php", datasend, function (res) {
        console.log(res)
        var data = res.items;
        if(data.length==0){
            $(".addListSV").html('<tr><td colspan="4"><span class="badge bg-danger">Không tìm thấy</span></td></tr>');
            $(".pagenumbersv").html("");
        }else{
            var stt=1;
         stt = printSTT(record,res.page);
        arrBM=data;
        var s = '';
        
        for (var i in data) {
            var d = data[i];
            var gt='Nam';
            if(d.gt==0){
                gt='Nữ';
            }
            var cv="BT";
            if(d.tencv!=null){
                cv=d.tencv
            }
            s = s + ' <tr>' +
                '<td>' + stt + '</td>' +
                '<td>' + d.masv + '</td>' +
                ' <td>' + d.tensv + '</td>' +
                ' <td>' + gt + '</td>' +
                ' <td>' + d.namsinh + '</td>' +
                ' <td>' + d.tenlop + '</td>' +
                ' <td>' + d.tenkhoa + '</td>' +
                ' <td>' + cv + '</td>' +
                '<td data-vt='+i+' data-mabm='+d.masv+' data-tenbm="'+d.tensv+'"><span class="badge bg-danger clickxembm">'+
                '<i class="fa fa-eye"></i>Xem</span>&nbsp;<span class="badge bg-danger clickxoabm"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
                '</tr>';
                stt++;
        }
    //    console.log(s);
        $(".addListSV").html(s);
        buildSlidePage($(".pagenumbersv"),5,res.page,res.totalpage);
    }
    });
}
