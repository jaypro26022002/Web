var flagNganh = 0;//giả sử người dùng chưa nhấn nút nào cả
var arrNganh=[];
$(document).ready(function () {
    $(".btnthemnganh").click(function () {
        $(".btnthemnganh").prop("disabled", true);
        $(".btnsuanganh").prop("disabled", true);//Mờ
        $(".btnluunganh").prop("disabled", false);//mờ
        $(".txtmanganh").val("");
        $(".txttennganh").val("");
        $(".txtmanganh").focus();
        flagNganh = 1;
        /* 
         */
    })
    $(".btnsuanganh").click(function () {
        $(".btnthemnganh").prop("disabled", true);
        $(".btnsuanganh").prop("disabled", true);//Mờ
        $(".btnluunganh").prop("disabled", false);//mờ

        flagNganh = 2;
        /* 
         */
    })
    $(".btnluunganh").click(function () {
        if (flagNganh == 1) { //lưu (insert dữ liệu mới)
            var datasend = {
                manganh: $(".txtmanganh").val(),
                tennganh: $(".txttennganh").val(),
                nambatdau:$(".cbnambatdau").val(),
                mabm:$(".cbbomon").val(),
                event:"insertNganh"
            }
            console.log(datasend);
            queryData("php/apiall.php", datasend, function (res) {
                console.log(res)
                if (res.success == 1) {
                    bootbox.alert("Thêm Thành Công");
                    //showDataTableBoMon();
                    showDataTableNganhPage(pagecurrent_nganh,record);
                } else {
                    bootbox.alert("Thêm không Thành Công");
                }
            });
        } else if (flagNganh == 2) { //update
            var datasend = {
                manganh: $(".txtmanganh").val(),
                tennganh: $(".txttennganh").val(),
                nambatdau:$(".cbnambatdau").val(),
                mabm:$(".cbbomon").val(),
                event:"updateNganh"
            }
            queryData("php/apiall.php", datasend, function (res) {
                console.log(res)
                if (res.success == 1) {
                    bootbox.alert("Cập nhật Thành Công");
                   // showDataTableBoMon();
                   showDataTableNganhPage(pagecurrent_nganh,record);
                } else {
                    bootbox.alert("Cập nhật không Thành Công");
                }
            });
        }
    })
    //bắt sự kiện nhấn nút làm lại
    $(".btnlamlainganh").click(function () {
        $(".txtmanganh").val("");
        $(".txttennganh").val("");
        flagNganh = 0;
        $(".btnthemnganh").prop("disabled", false);//sáng
        $(".btnsuanganh").prop("disabled", false);//Mờ
        $(".btnluunganh").prop("disabled", true);//mờ
    });
    $(".btnxoanganh").click(function () {
        var ma = $(".txtmanganh").val();
        bootbox.confirm("Bạn có đồng ý xóa ngành:" + ma + " này?", function (result) {
            console.log('This was logged in the callback: ' + result);
            if (result == true) {
                var datasend = {
                    manganh: ma,
                    event:"deleteNganh"
                    
                }
                queryData("php/apiall.php", datasend, function (res) {
                    console.log(res)
                    if (res.success == 1) {
                        bootbox.alert("Xóa Thành Công");
                        //showDataTableBoMon();
                        showDataTableNganhPage(pagecurrent_nganh,record);
                    } else {
                        bootbox.alert("Xóa không Thành Công");
                    }
                });
            }
        });
    })
    //xử lý nút tìm 
    $(".btntimnganh").click(function () {
       // showDataTableBoMon();
       showDataTableNganhPage(pagecurrent_nganh,record);
    });
    //bắt sự kiện người dùng nhấn phím Enter
    $(".txttimnganh").keyup(function (e) {
        if (e.which == 13) { //13: Enter
          //  showDataTableBoMon();
          showDataTableNganhPage(pagecurrent_nganh,record);
        }
    })
    //click vaò nút xem của bảng table bộ môn
    $(".addListNganh").on('click','.clickxemnganh',function(){
    
        var vt=$(this).parent().attr("data-vt");
        $(".txtmanganh").val(arrNganh[vt].manganh);
        $(".txttennganh").val(arrNganh[vt].tennganh);
        $(".cbnambatdau").val(arrNganh[vt].nambatdau);
        $(".cbbomon").val(arrNganh[vt].mabm);
        
        $(".btnsuanganh").prop("disabled",false);
    });
    //Nhấn nút xóa
    $(".addListNganh").on('click','.clickxoanganh',function(){
        var vt=$(this).parent().attr("data-vt");
        var ma=arrNganh[vt].manganh;
        bootbox.confirm("Bạn có đồng ý xóa ngành này:" + ma + " này?", function (result) {
            console.log('This was logged in the callback: ' + result);
            if (result == true) {
                var datasend = {
                    manganh: ma,
                    event:"deleteNganh"
                }
                queryData("php/apiall.php", datasend, function (res) {
                    console.log(res)
                    if (res.success == 1) {
                        bootbox.alert("Xóa Thành Công");
                       // showDataTableBoMon();
                       showDataTableNganhPage(pagecurrent_nganh,record);
                       
                    } else {
                        bootbox.alert("Xóa không Thành Công");
                    }
                });
            }
        });
    });
    var pagecurrent_nganh=0;
	$(".pagenumbernganh").on('click','button',function () {
    
        pagecurrent_nganh=$(this).val();
        showDataTableNganhPage($(this).val(),record);
	})
});
//có sử dụng phân tranf
function showDataTableNganhPage(page,record) {
    var search = $(".txttimnganh").val();
    console.log("serach=" + search);
    var datasend = {
        page:page,
        record:record,
        search: search,
        event:"getNganhPhanTrang"
    }
    console.log( datasend);
    $(".addListNganh").html('<tr><td colspan="4"><img src="images/loading.gif" width="20px" height="20px">Đang tải dữ liệu</td></tr>');
      
    queryData("php/apiall.php", datasend, function (res) {
        console.log(res)
        var data = res.items;
        if(data.length==0){
            $(".addListNganh").html('<tr><td colspan="4"><span class="badge bg-danger">Không tìm thấy</span></td></tr>');
            $(".pagenumbernganh").html("");
        }else{
            var stt=1;
         stt = printSTT(record,res.page);
        arrNganh=data;
        var s = '';
        
        for (var i in data) {
            var d = data[i];
            s = s + ' <tr>' +
                '<td>' + stt + '</td>' +
                '<td>' + d.manganh + '</td>' +
                ' <td>' + d.tennganh + '</td>' +
                ' <td>' + d.nambatdau + '</td>' +
                ' <td>' + d.tenbm+ '</td>' +
                '<td data-vt='+i+'><span class="badge bg-danger clickxemnganh">'+
                '<i class="fa fa-eye"></i>Xem</span>&nbsp;<span class="badge bg-danger clickxoanganh"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;Xóa</span></td>' +
                '</tr>';
                stt++;
        }
    //    console.log(s);
        $(".addListNganh").html(s);
        buildSlidePage($(".pagenumbernganh"),5,res.page,res.totalpage);
    }
    });
}
/////
//viết hàm load các năm vào combobox
function showNamBD(){
    var html='';
    for(var i=1959;i<=2025;i++){
        html=html+'<option value="'+i+'">'+i+'</option>';
    }
    $(".cbnambatdau").html(html);
}
function showCBBoMon(){
    var datasend={
        event:"getALLDataBoMon"
    }
    queryData("php/apiall.php", datasend, function (res) {
        var data=res.items;
        var ht='<option value="NULL">Chọn bộ môn</option>';
        for(var i in data){
            var d=data[i];
            ht=ht+'<option value="'+d.mabm+'">'+d.tenbm+'</option>';
        }
        $(".cbbomon").html(ht);
    });
}