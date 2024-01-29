
$(document).ready(function(){
    swapForm("frmsinhvien");
        $(".menulop").click(function(){
            console.log("menu lop");
            swapForm("frmlop");
            var st=' <li class="breadcrumb-item"><a href="#" >Danh mục</a></li>'+
                    ' <li class="breadcrumb-item active">Lớp</li>';
                    console.log(st);
            $(".breadcrumbcurrent").html(st);
        })
        $(".menunganh").click(function(){
            swapForm("frmnganh");
            var st=' <li class="breadcrumb-item"><a href="#" >Danh mục</a></li>'+
            ' <li class="breadcrumb-item active">Ngành</li>';         
            $(".breadcrumbcurrent").html(st);
            showNamBD();
            showCBBoMon();
            showDataTableNganhPage(0,record);
        })
        $(".menusinhvien").click(function(){
            swapForm("frmsinhvien");
            var st=' <li class="breadcrumb-item"><a href="#" >Danh mục</a></li>'+
            ' <li class="breadcrumb-item active">Sinh Viên</li>';
            console.log(st);
             $(".breadcrumbcurrent").html(st);
             showCBBoMon();
             showCBNganhByMaBM("");
             showCBKhoa();
             showCBChucVu();
             showCBLopByMaNganh("");
             showDataTableSVPage(0,record);
             $(".btnthemsv").prop("disabled",false);//sáng
             $(".btnsuasv").prop("disabled",true);//Mờ
             $(".btnluusv").prop("disabled",true);//mờ
        })
        function swapForm(f){
			$(".frmbomon").addClass("is-hidden");
            $(".frmnganh").addClass("is-hidden");
            $(".frmlop").addClass("is-hidden"); 
            $(".frmsinhvien").addClass("is-hidden");
			
            $("."+f).removeClass("is-hidden");
        }
        $(".btnhome").click(function(){
            swapForm("frmsinhvien");
            var st=' <li class="breadcrumb-item"><a href="#" >Danh mục</a></li>'+
            ' <li class="breadcrumb-item active">Sinh Viên</li>';
            console.log(st);
             $(".breadcrumbcurrent").html(st);
        });
		$(".menubomon").click(function(){
            swapForm("frmbomon");
            var st=' <li class="breadcrumb-item"><a href="#" >Danh mục</a></li>'+
            ' <li class="breadcrumb-item active">Bộ môn</li>';
            console.log(st);
             $(".breadcrumbcurrent").html(st);
             $(".btnthembm").prop("disabled",false);//sáng
             $(".btnsuabm").prop("disabled",true);//Mờ
             $(".btnluubm").prop("disabled",true);//mờ
            // showDataTableBoMon();
            showDataTableBoMonPage(0,record);
        });
});