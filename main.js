$(document).ready(function () {
    // REGION 1
    const gDRINK_BASE_URL = "http://42.115.221.44:8080/devcamp-pizza365/drinks";
    const gVOUVHER_BASE_URL = "http://42.115.221.44:8080/devcamp-voucher-api/voucher_detail/";
    const gBASE_URL_ORDER = "http://42.115.221.44:8080/devcamp-pizza365/orders";
    const gREQUEST_READY_STATUS_FINISH_AND_OK = 4;
    const gREQUEST_CREATE_SUCCESS = 201;
    const gREQUEST_STATUS_FINISH_AND_OK = 200;
    var gSelectedMenuStructure = {
        menuName: "...",    // S, M, L
        duongKinhCM: 0,
        suongNuong: 0,
        saladGr: 0,
        drink: 0,
        priceVND: 0
    }
    var gThongTinDatHang = {
        name: "",
        email: "",
        numPhone: "",
        address: "",
        message: "",
        voucher: ""
    };
    var gSelectedPizzaType = "...";
    var gDrink = "";
    var gObjectRequest = {
        kichCo: "",
        duongKinh: "",
        suon: "",
        salad: "",
        loaiPizza: "",
        idVourcher: "",
        idLoaiNuocUong: "",
        soLuongNuoc: "",
        hoTen: "",
        thanhTien: "",
        email: "",
        soDienThoai: "",
        diaChi: "",
        loiNhan: ""
    }
    // REGION 2
    onPageLoading();

    $("#btn-choose-small").on("click", function () {
        onBtnSmallSizeClick();
    });

    $("#btn-choose-medium").on("click", function () {
        onBtnMediumSizeClick();
    });

    $("#btn-choose-large").on("click", function () {
        onBtnLargeSizeClick();
    });

    $("#btn-seefood-pizza").on("click", function () {
        onBtnSeefoodPizzaClick();
    });

    $("#btn-hawai-pizza").on("click", function () {
        onBtnHawaiPizzaClick();
    });

    $("#btn-bacon-pizza").on("click", function () {
        onBtnBaconPizzaClick();
    });

    $("#btn-send").on("click", function () {
        onBtnSendClick();
    });

    $("#btn-quaylai").on("click", function () {
        $("#myModal").modal("hide");
    });

    $("#btn-taodon").on("click", function () {
        $("#myModal").modal("hide");
        createOrderClick(gObjectRequest);
    });
    // REGION 3
    function onPageLoading() {
        getDrinkFromAPI(gDRINK_BASE_URL);
        showDrinkMenu(gDRINK_BASE_URL);
    }

    function onBtnSmallSizeClick() {
        changeSizeButtonColor("S");
        var vSelectedMenuStructure = getMenu(gSelectedMenuStructure, "S", "20cm", 2, "200g", 2, 150000);
    }

    function onBtnMediumSizeClick() {
        changeSizeButtonColor("M");
        var vSelectedMenuStructure = getMenu(gSelectedMenuStructure, "M", "25cm", 4, "300g", 3, 200000);
    }

    function onBtnLargeSizeClick() {
        changeSizeButtonColor("L");
        var vSelectedMenuStructure = getMenu(gSelectedMenuStructure, "L", "30cm", 8, "500g", 4, 250000);
    }

    function onBtnSeefoodPizzaClick() {
        changeTypeButtonColor(1);
        gSelectedPizzaType = "SeeFood Pizza";
        console.log("%c B???n ???? ch???n: " + gSelectedPizzaType, "color: orange");
    }

    function onBtnHawaiPizzaClick() {
        changeTypeButtonColor(2);
        gSelectedPizzaType = "Hawai Pizza";
        console.log("%c B???n ???? ch???n: " + gSelectedPizzaType, "color: orange");
    }

    function onBtnBaconPizzaClick() {
        changeTypeButtonColor(3);
        gSelectedPizzaType = "Bacon Pizza";
        console.log("%c B???n ???? ch???n: " + gSelectedPizzaType, "color: orange");
    }

    function onBtnSendClick() {
        getDataFromForm(gThongTinDatHang);
        var vCheckValidate = validateData(gThongTinDatHang);
        if (vCheckValidate) {
            showModal();
        }
    }
    // REGION 4
    function changeSizeButtonColor(paramSize) {
        var vBtnSmall = $("#btn-choose-small");
        var vBtnMedium = $("#btn-choose-medium");
        var vBtnLarge = $("#btn-choose-large");

        if (paramSize === "S") {  //n???u ch???n PRO th?? thay m??u n??t Pro b???ng m??u cam (btn-warning), hai n??t kia xanh (btn-success)
            //code ?????i m??u 3 n??t, khi g??i pro ???????c ch???n
            vBtnSmall.attr("class", "btn btn-info w-100");
            vBtnMedium.attr("class", "btn btn-warning w-100");
            vBtnLarge.attr("class", "btn btn-warning w-100");
        }
        else if (paramSize === "M") {  //n???u ch???n Basic th?? thay m??u n??t Pro b???ng m??u cam (btn-warning), hai n??t kia xanh (btn-success)
            vBtnSmall.attr("class", "btn btn-warning w-100");
            vBtnMedium.attr("class", "btn btn-info w-100");
            vBtnLarge.attr("class", "btn btn-warning w-100");
        }
        else if (paramSize === "L") { //n???u ch???n Premium th?? thay m??u n??t Premium b??ng m??u cam, hai n??t kia xanh
            //code ?????i m??u 3 n??t, khi g??i premium ???????c ch???n
            vBtnSmall.attr("class", "btn btn-warning w-100");
            vBtnMedium.attr("class", "btn btn-warning w-100");
            vBtnLarge.attr("class", "btn btn-info w-100");
        }
    }

    function getMenu(paramMenuObj, paramMenuName, paramDuongKinh, paramSuonNuong, paramSalad, paramNuocNgot, paramPrice) {
        paramMenuObj.menuName = paramMenuName;
        paramMenuObj.duongKinhCM = paramDuongKinh;
        paramMenuObj.suongNuong = paramSuonNuong;
        paramMenuObj.saladGr = paramSalad;
        paramMenuObj.drink = paramNuocNgot;
        paramMenuObj.priceVND = paramPrice;

        console.log("%c Memu ch???n: ", "color: red");
        console.log("Size: " + paramMenuName);
        console.log("???????ng k??nh: " + paramDuongKinh);
        console.log("S?????n n?????ng: " + paramSuonNuong);
        console.log("Salad: " + paramSalad);
        console.log("N?????c ng???t: " + paramNuocNgot);
        console.log("Price: " + paramPrice);
    }

    function changeTypeButtonColor(paramType) {
        var vBtnType1 = $("#btn-seefood-pizza");
        var vBtnType2 = $("#btn-hawai-pizza");
        var vBtnType3 = $("#btn-bacon-pizza");

        if (paramType === 1) {  //n???u ch???n PRO th?? thay m??u n??t Pro b???ng m??u cam (btn-warning), hai n??t kia xanh (btn-success)
            //code ?????i m??u 3 n??t, khi g??i pro ???????c ch???n
            vBtnType1.attr("class", "btn btn-info w-100");
            vBtnType2.attr("class", "btn btn-warning w-100");
            vBtnType3.attr("class", "btn btn-warning w-100");
        }
        else if (paramType == 2) {  //n???u ch???n Basic th?? thay m??u n??t Pro b???ng m??u cam (btn-warning), hai n??t kia xanh (btn-success)
            vBtnType1.attr("class", "btn btn-warning w-100");
            vBtnType2.attr("class", "btn btn-info w-100");
            vBtnType3.attr("class", "btn btn-warning w-100");
        }
        else if (paramType == 3) { //n???u ch???n Premium th?? thay m??u n??t Premium b??ng m??u cam, hai n??t kia xanh
            //code ?????i m??u 3 n??t, khi g??i premium ???????c ch???n
            vBtnType1.attr("class", "btn btn-warning w-100");
            vBtnType2.attr("class", "btn btn-warning w-100");
            vBtnType3.attr("class", "btn btn-info w-100");
        }
    }

    // H??m l???y ????? u???ng t??? API v??o ?? select
    function getDrinkFromAPI(paramAPI) {
        $.ajax({
            url: paramAPI,
            type: "GET",
            dataType: "json",
            success: function (paramRes) {
                for (var bIndex = 0; bIndex < paramRes.length; bIndex++) {
                    var bSelectDrink = $("#select-drink");
                    var bNewOption = $("<option>", {
                        text: paramRes[bIndex].tenNuocUong,
                        value: paramRes[bIndex].maNuocUong
                    }).appendTo(bSelectDrink);
                }
                console.log(paramRes)
            },
            error: function (paramError) {
                console.assert(paramError.responseText);
            }
        });
    }

    // L???y th??ng tin n?????c u???ng hi???n thi l??n browser
    function showDrinkMenu(paramAPI) {
        "use strict";
        var vTableShowDrink = $("#show-drink");
        $.ajax({
            url: paramAPI,
            type: "GET",
            dataType: "json",
            success: function (paramRes) {
                for (var bIndex = 0; bIndex < paramRes.length; bIndex++) {
                    var bNewRow = $("<tr>").appendTo(vTableShowDrink);
                    $("<td>", {
                        html: paramRes[bIndex].tenNuocUong
                    }).appendTo(bNewRow);
                    $("<td>", {
                        html: paramRes[bIndex].donGia
                    }).appendTo(bNewRow);
                }
            },
            error: function (paramError) {
                console.assert(paramError.responseText);
            }
        });
    }

    // L???y d??? li???u th??ng tin ng?????i nh???p l??u v??o object
    function getDataFromForm(paramObj) {
        var vInpName = $("#inp-fullname");
        var vInpEmail = $("#inp-email");
        var vInpPhoneNum = $("#inp-dien-thoai");
        var vInpAddress = $("#inp-dia-chi");
        var vInpMessage = $("#inp-message");
        var vInpVoucher = $("#inp-voucher");
        var vSelectDrink = $("#select-drink");

        paramObj.name = vInpName.val().trim();
        paramObj.email = vInpEmail.val().trim();
        paramObj.numPhone = vInpPhoneNum.val().trim();
        paramObj.address = vInpAddress.val().trim();
        paramObj.message = vInpMessage.val().trim();
        paramObj.voucher = vInpVoucher.val().trim();
        gDrink = vSelectDrink.val();
    }

    // Check d??? li???u
    function validateData(paramObj) {
        var vCheckValidate = true;
        if (!paramObj.name) {
            vCheckValidate = false;
            alert("B???n ch??a nh???p t??n");
        }
        else if (!paramObj.email) {
            vCheckValidate = false;
            alert("B???n ch??a nh???p email");
        }
        else if (!paramObj.email.includes("@")) {
            vCheckValidate = false;
            alert("Email kh??ng h???p l???");
        }
        else if (!paramObj.numPhone) {
            vCheckValidate = false;
            alert("B???n ch??a nh???p s??? ??i???n tho???i");
        }
        else if (!paramObj.address) {
            vCheckValidate = false;
            alert("B???n ch??a nh???p ?????a ch???");
        }
        else if (gDrink == "ALL") {
            vCheckValidate = false;
            alert("B???n ch??a ch???n ????? u???ng");
        }
        return vCheckValidate;
    }

    function showModal() {
        var vThongTinDatHang = "";

        $("#myModal").modal("show");
        $("#inp-fullname-modal").val(gThongTinDatHang.name);
        $("#inp-email-modal").val(gThongTinDatHang.email);
        $("#inp-dien-thoai-modal").val(gThongTinDatHang.numPhone);
        $("#inp-dia-chi-modal").val(gThongTinDatHang.address);
        $("#inp-message-modal").val(gThongTinDatHang.message);
        $("#inp-voucher-modal").val(gThongTinDatHang.voucher);

        vThongTinDatHang += ("X??c nh???n: " + gThongTinDatHang.name + ", " + gThongTinDatHang.numPhone + ", " + gThongTinDatHang.address);
        vThongTinDatHang += (". Menu " + gSelectedMenuStructure.menuName + ", s?????n n?????ng " + gSelectedMenuStructure.suongNuong + ", n?????c " + gSelectedMenuStructure.drink + ",...");
        vThongTinDatHang += (". Lo???i pizza: " + gSelectedPizzaType + ", Gi??: " + gSelectedMenuStructure.priceVND + ", M?? gi???m gi??: " + gThongTinDatHang.voucher);
        vThongTinDatHang += (". Ph???i thanh to??n: " + getSoTienThanhToan(gSelectedMenuStructure.priceVND, getVoucher(gThongTinDatHang.voucher, gVOUVHER_BASE_URL)) + " vnd (gi???m gi?? " + getVoucher(gThongTinDatHang.voucher, gVOUVHER_BASE_URL) + "%)");
        $("#textarea-detail-modal").val(vThongTinDatHang);
    }

    // H??m l???y voucher t??? server qua API
    function getVoucher(paramVoucher, paramAPI) {
        var vVoucher = 0;
        if (!paramVoucher.trim()) {
            vVoucher = 0;
        }
        else {
            var vXmlHttp = new XMLHttpRequest();
            vXmlHttp.open("GET", paramAPI + paramVoucher, false);
            vXmlHttp.send();
            var vStatusCode = vXmlHttp.status;
            if (vStatusCode == gREQUEST_STATUS_FINISH_AND_OK) {
                var bVoucherResponse = JSON.parse(vXmlHttp.responseText);
                vVoucher = bVoucherResponse.phanTramGiamGia;
            }
            else {
                vVoucher = 0;
            }
        }
        return vVoucher;
    }

    // H??m tr??? v??? s??? ti???n c???n thanh to??n
    function getSoTienThanhToan(paramMoney, paramDiscount) {
        var vSoTienDuocGiam = (paramMoney * paramDiscount) / 100;
        return paramMoney - vSoTienDuocGiam;
    }

    function createOrderClick(paramOrderCreate) {
        "use strict";
        paramOrderCreate.kichCo = gSelectedMenuStructure.menuName;
        paramOrderCreate.duongKinh = gSelectedMenuStructure.duongKinhCM;
        paramOrderCreate.suon = gSelectedMenuStructure.suongNuong;
        paramOrderCreate.salad = gSelectedMenuStructure.saladGr;
        paramOrderCreate.loaiPizza = gSelectedPizzaType;
        paramOrderCreate.idVourcher = gThongTinDatHang.voucher;
        paramOrderCreate.idLoaiNuocUong = gDrink;
        paramOrderCreate.soLuongNuoc = gSelectedMenuStructure.drink;
        paramOrderCreate.hoTen = gThongTinDatHang.name;
        paramOrderCreate.thanhTien = (getSoTienThanhToan(gSelectedMenuStructure.priceVND, getVoucher(gThongTinDatHang.voucher, gVOUVHER_BASE_URL)));
        paramOrderCreate.email = gThongTinDatHang.email;
        paramOrderCreate.soDienThoai = gThongTinDatHang.numPhone
        paramOrderCreate.diaChi = gThongTinDatHang.address;
        paramOrderCreate.loiNhan = gThongTinDatHang.message;
        var vXmlHttpCreateOrder = new XMLHttpRequest();
        vXmlHttpCreateOrder.open("POST", gBASE_URL_ORDER, true);
        vXmlHttpCreateOrder.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        vXmlHttpCreateOrder.send(JSON.stringify(paramOrderCreate));
        vXmlHttpCreateOrder.onreadystatechange =
            function () {
                if (this.readyState == gREQUEST_READY_STATUS_FINISH_AND_OK && this.status == gREQUEST_CREATE_SUCCESS) { // status 201 tao thanh cong
                    var vCreatedOrder = vXmlHttpCreateOrder.responseText;
                    var vObjCreateOrder = JSON.parse(vCreatedOrder);
                    $("#myModalCreateOrder").modal("show");
                    $("#inp-show-idorder").val(vObjCreateOrder.orderId);
                }
            }
    }
});