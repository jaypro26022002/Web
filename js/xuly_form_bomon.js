var flagBM = 0;//giả sử người dùng chưa nhấn nút nào cả
var arrBM=[];
$(document).ready(function () {
    $(".btnthembm").click(function () {
        $(".btnthembm").prop("disabled", true);
        $(".btnsuabm").prop("disabled", true);//Mờ
        $(".btnluubm").prop("disabled", false);//mờ
        $(".txtmabm").val("");
        $(".txttenbm").val("");
        $(".txtmabm").focus();
        flagBM = 1;
        /* 
         */
    })
    $(".btnsuabm").click(function () {
        $(".btnthembm").prop("disabled", true);
        $(".btnsuabm").prop("disabled", true);//Mờ
        $(".btnluubm").prop("disabled", false);//mờ

        flagBM = 2;
        /* 
         */
    })
    $(".btnluubm").click(function () {
        if (flagBM == 1) { //lưu (insert dữ liệu mới)
            var datasend = {
                mabm: $(".txtmabm").val(),
                tenbm: $(".txttenbm").val()
            }
            console.log(datasend);
            queryData("php/apiinsert.php", datasend, function (res) {
                console.log(res)
                if (res.success == 1) {
                    bootbox.alert("Thêm Thành Công");
                    //showDataTableBoMon();
                    showDataTableBoMonPage(pagecurrent_bm,record);
                } else {
                    bootbox.alert("Thêm không Thành Công");
                }
            });
        } else if (flagBM == 2) { //update
            console.log("update");
            var datasend = {
                mabm: $(".txtmabm").val(),
                tenbm: $(".txttenbm").val()
            }
            console.log(datasend);
            queryData("php/apiupdate.php", datasend, function (res) {
                console.log(res)
                if (res.success == 1) {
                    bootbox.alert("Cập nhật Thành Công");
                   // showDataTableBoMon();
                   showDataTableBoMonPage(pagecurrent_bm,record);
                } else {
                    bootbox.alert("Cập nhật không Thành Công");
                }
            });
        }
    })
    //bắt sự kiện nhấn nút làm lại
    $(".btnlamlaibm").click(function () {
        $(".txtmabm").val("");
        $(".txttenbm").val("");
        flagBM = 0;
        $(".btnthembm").prop("disabled", false);//sáng
        $(".btnsuabm").prop("disabled", false);//Mờ
        $(".btnluubm").prop("disabled", true);//mờ
    });
    $(".btnxoabm").click(function () {
        var ma = $(".txtmabm").val();
        bootbox.confirm("Bạn có đồng ý xóa mã:" + ma + " này?", function (result) {
            console.log('This was logged in the callback: ' + result);
            if (result == true) {
                var datasend = {
                    mabm: ma
                }
                queryData("php/apidelete.php", datasend, function (res) {
                    console.log(res)
                    if (res.success == 1) {
                        bootbox.alert("Xóa Thành Công");
//showDataTableBoMon();
                        showDataTableBoMonPage(pagecurrent_bm,record);
                    } else {
                        bootbox.alert("Xóa không Thành Công");
                    }
                });
            }
        });
    })
    //xử lý nút tìm 
    $(".btntimbm").click(function () {
       // showDataTableBoMon();
       showDataTableBoMonPage(pagecurrent_bm,record);
    });
    //bắt sự kiện người dùng nhấn phím Enter
    $(".txttimbm").keyup(function (e) {
        if (e.which == 13) { //13: Enter
          //  showDataTableBoMon();
          showDataTableBoMonPage(pagecurrent_bm,record);
        }
    })
    //click vaò nút xem của bảng table bộ môn
    $(".addListBM").on('click','.clickxembm',function(){
     /* c1
        console.log("da nhan");
        console.log($(this).html());
        console.log($(this).parent().attr("data-mabm"));
        var mabm=$(this).parent().attr("data-mabm");
        var tenbm=$(this).parent().attr("data-tenbm");
        $(".txtmabm").val(mabm);
        $(".txttenbm").val(tenbm);
        $(".btnsuabm").prop("disabled",false);
        */
       //c2
        var vt=$(this).parent().attr("data-vt");
        $(".txtmabm").val(arrBM[vt].mabm);
        $(".txttenbm").val(arrBM[vt].tenbm);
        $(".btnsuabm").prop("disabled",false);
    });
    //Nhấn nút xóa
    $(".addListBM").on('click','.clickxoabm',function(){
        var vt=$(this).parent().attr("data-vt");
        var ma=arrBM[vt].mabm;
        bootbox.confirm("Bạn có đồng ý xóa mã :" + ma + " này?", function (result) {
            console.log('This was logged in the callback: ' + result);
            if (result == true) {
                var datasend = {
                    mabm: ma
                }
                queryData("php/apidelete.php", datasend, function (res) {
                    console.log(res)
                    if (res.success == 1) {
                        bootbox.alert("Xóa Thành Công");
                       // showDataTableBoMon();
                       showDataTableBoMonPage(pagecurrent_bm,record);
                       
                    } else {
                        bootbox.alert("Xóa không Thành Công");
                    }
                });
            }
        });
    });
    var pagecurrent_bm=0;
	$(".numberpagebm").on('click','button',function () {
    
        pagecurrent_bm=$(this).val();
        showDataTableBoMonPage($(this).val(),record);
	})
});
function showDataTableBoMon() {
    var search = $(".txttimbm").val();
    console.log("serach=" + search);
    var datasend = {
        search: search
    }
    $(".addListBM").html('<tr><td colspan="4"><img src="images/loading.gif" width="20px" height="20px">Đang tải dữ liệu</td></tr>');
      
    queryData("php/apigetdata.php", datasend, function (res) {
        console.log(res)
        var data = res.items;
        if(data.length==0){
$(".addListBM").html('<tr><td colspan="4"><span class="badge bg-danger">Không tìm thấy</span></td></tr>');
        }else{
        arrBM=data;
        var s = '';
        var stt = 1;
        for (var i in data) {
            var d = data[i];
            s = s + ' <tr>' +
                '<td>' + stt + '</td>' +
                '<td>' + d.mabm + '</td>' +
                ' <td>' + d.tenbm + '</td>' +
                '<td data-vt='+i+' data-mabm='+d.mabm+' data-tenbm="'+d.tenbm+'"><span class="badge bg-danger clickxembm">'+
                '<i class="fa fa-eye"></i>Xem</span>&nbsp;<span class="badge bg-danger clickxoabm"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
                '</tr>';
                stt++;
        }
    //    console.log(s);
        $(".addListBM").html(s);
    }
    });
}
//có sử dụng phân tranf
function showDataTableBoMonPage(page,record) {
    var search = $(".txttimbm").val();
    console.log("serach=" + search);
    var datasend = {
        page:page,
        record:record,
        search: search
    }
    $(".addListBM").html('<tr><td colspan="4"><img src="images/loading.gif" width="20px" height="20px">Đang tải dữ liệu</td></tr>');
      
    queryData("php/apigetdataphantrang.php", datasend, function (res) {
        console.log(res)
        var data = res.items;
        if(data.length==0){
            $(".addListBM").html('<tr><td colspan="4"><span class="badge bg-danger">Không tìm thấy</span></td></tr>');
            $(".numberpagebm").html("");
        }else{
            var stt=1;
         stt = printSTT(record,res.page);
        arrBM=data;
        var s = '';
        
        for (var i in data) {
            var d = data[i];
            s = s + ' <tr>' +
                '<td>' + stt + '</td>' +
                '<td>' + d.mabm + '</td>' +
                ' <td>' + d.tenbm + '</td>' +
                '<td data-vt='+i+' data-mabm='+d.mabm+' data-tenbm="'+d.tenbm+'"><span class="badge bg-danger clickxembm">'+
                '<i class="fa fa-eye"></i>Xem</span>&nbsp;<span class="badge bg-danger clickxoabm"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
                '</tr>';
                stt++;
        }
    //    console.log(s);
        $(".addListBM").html(s);
        buildSlidePage($(".numberpagebm"),5,res.page,res.totalpage);
    }
    });
}
