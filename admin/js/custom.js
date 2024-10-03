$(function () {
    "use strict";

    $(".preloader").fadeOut();
    // this is for close icon when navigation open in mobile view
    $(".nav-toggler").on('click', function () {
        $("#main-wrapper").toggleClass("show-sidebar");
        $(".nav-toggler i").toggleClass("ti-menu");
    });
    $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
        $(".app-search").toggle(200);
        $(".app-search input").focus();
    });

    // ============================================================== 
    // Resize all elements
    // ============================================================== 
    $("body, .page-wrapper").trigger("resize");
    $(".page-wrapper").delay(20).show();

    //****************************
    /* This is for the mini-sidebar if width is less then 1170*/
    //**************************** 
    var setsidebartype = function () {
        var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
        if (width < 1170) {
            $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
        } else {
            $("#main-wrapper").attr("data-sidebartype", "full");
        }
    };
    $(window).ready(setsidebartype);
    $(window).on("resize", setsidebartype);

});

function getQueryString(field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : null;
}
function getQueryParams(url) {
    const paramArr = url.slice(url.indexOf('?') + 1).split('&');
    const params = {};
    paramArr.map(param => {
        const [key, val] = param.split('=');
        params[key] = decodeURIComponent(val);
    })
    return params;
}
function getSatusCount() {
    var tot_prod_cnt = 0;
    var tot_cat_cnt = 0;
    let prd = localStorage.getItem("productDetail");
    let cat = localStorage.getItem("categoryData");
  
    prd  = prd != null ? JSON.parse(prd) : 0;
    cat  = cat != null ? JSON.parse(cat) : 0;
    
    tot_prod_cnt = prd != 0 ? prd.length : 0;
    tot_cat_cnt  = cat != 0 ? cat.length : 0;
   
    document.getElementById("tot_prod_cnt").innerHTML = tot_prod_cnt;
    document.getElementById("tot_cat_cnt").innerHTML = tot_cat_cnt;
    
}
window.setTimeout(function () {
    $(".alert").fadeTo(500, 0).slideUp(500, function () {
        $(this).remove();
    });
}, 4000);

function logout(){
    let ls_login_detail = localStorage.getItem("loginDetail");
    ls_login_detail  = ls_login_detail != null ? JSON.parse(ls_login_detail) : 0;
    if(ls_login_detail != 0)
    {
        ls_login_detail.is_login = false;
        localStorage.setItem("loginDetail",JSON.stringify(ls_login_detail));
    }
    window.location.href="login.html"; 
}