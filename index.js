var cartArray = [];
const gc_local_storage = 'CartDetail';
window.addEventListener("DOMContentLoaded", (event) => {
    /* 
    fetch("./product.json")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        
    });
    */
    var queryString = getQueryString("cat_id");
    let data = JSON.parse(localStorage.getItem("productDetail"));

    let filtered = data.filter((data) => {
        return data.catogory_id == queryString;
    });
    if (filtered.length > 0) {
        data = filtered;
    }
    var row = 0;
    var html = '';
    for (var i = 0; i < data.length; i++) {

        if (row == 0) {
            html += '<div class="container-fluid">';
            html += '<div class="product-list">';
            html += '<div class="row">';
        }
        html += '<div class="col-md-3 col-sm-6">';
        html += '<div class="white-box">';
        html += '<div class="wishlist-icon">';
        html += '<a href="javascript:void(0);"><span class="badge badge-success">' + data[i].catogory_name + '</span></a>';
        html += '</div>';
        html += '<div class="product-img">';
        html += '<img class="pic-1" src="' + data[i].product_img + '"  height="150" width="150">';
        html += '</div>';
        html += '<div class="product-bottom">';
        html += '<div class="product-name">' + data[i].product_name + '</div>';
        html += '<div class="price">';
        html += '<span class="rupee-icon">₹</span>';
        html += '<span class="product-price">' + data[i].product_price + '</sapn>';
        html += '</div>';
        html += '<button class="btn btn-primary add-to-cart" onClick="add_to_cart(this)">Add To Cart</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        row++;
        if (row == 4) {
            html += '</div>';
            html += '</div>';
            html += '</div>';
            row = 0;
        }
    }
    document.getElementById('product_page').innerHTML = html;
});
function cartTable() {
    var count = 0;
    var btnCartCount = document.getElementById("cart");
    var span_tag = btnCartCount.getElementsByTagName('span')[0];

    if (cartArray.length <= 0) {
        localStorage.removeItem(gc_local_storage);

        let arrDetail = localStorage.getItem(gc_local_storage);
        document.getElementById('staticBackdrop_body').innerHTML = '';
        span_tag.textContent = count;
        return true;
    }
    let html = "<table class='table table-responsive'>";
    html += "<thead>";
    html += "<tr>";
    html += "<th scope='col'>Product Image</th>";
    html += "<th scope='col'>Product Name</th>";
    html += "<th scope='col'>Product price</th>";
    html += "<th scope='col'>qty</th>";
    html += "<th scope='col'>Sub total</th>";
    html += "<th scope='col'>Action</th>";
    html += "</tr>";
    html += "</thead>";
    var tot_price = 0,
        tot_qty = 0;

    for (let i in cartArray) {
        count = count + cartArray[i].qty;
        //for(let i=0;i<cartArray.length;i++){
        let subtot = 0;
        subtot = parseInt(cartArray[i].price) * parseInt(cartArray[i].qty);
        tot_qty = tot_qty + parseInt(cartArray[i].qty);
        html += "<tr>";
        html += "<td><img src='" + cartArray[i].img + "' height='100' width='100'/></td>";
        html += "<td>" + cartArray[i].pname + "</td>";
        html += "<td>" + cartArray[i].price + "</td>";
        html += "<td>" + cartArray[i].qty + "</td>";
        html += "<td>" + subtot + "</td>";
        html += "<td><input type='button' name='del' id='del' class='btn btn-primary' value='Delete' onclick= 'delData(" + i + ")'>";
        html += "</tr>";
        tot_price = tot_price + subtot;
    }
    html += "<tr>";
    html += "<td colspan='3'>Total</td>";
    html += "<td>" + tot_qty + "</td>";
    html += "<td>" + tot_price + "</td>";
    html += "</tr>";
    html += "</html>";
    span_tag.textContent = count;

    localStorage.setItem(gc_local_storage, JSON.stringify(cartArray));

    let arrDetail = localStorage.getItem(gc_local_storage);
    document.getElementById('staticBackdrop_body').innerHTML = html;
}
function add_to_cart(btn) {
    var cartObj = { "pname": "", "price": "", "qty": 1, "img": "" };
    let parentDiv = btn.parentNode;
    let per_parentDiv = parentDiv.parentNode;

    var img_res = per_parentDiv.getElementsByTagName('img')[0];
    var prod_name_div = per_parentDiv.getElementsByClassName('product-name')[0];
    var prod_price_span = per_parentDiv.getElementsByClassName('product-price')[0];

    var pname = prod_name_div.textContent;
    var price = prod_price_span.textContent;
    var img_src = img_res.src;
    cartObj.pname = pname;
    cartObj.price = price;
    cartObj.img = img_src;
    if (cartArray.length > 0) {
        var foundValue = cartArray.findIndex(item => item.pname === pname);
        if (foundValue === -1) {
            cartArray.push(cartObj);

        } else {
            cartArray[foundValue].qty += 1;
        }
    } else {
        cartArray.push(cartObj);
    }
    cartTable();
}
function delData(del_idx) {
    cartArray.splice(del_idx, 1);
    console.log(cartArray);
    cartTable();


}
function getQueryString(field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : null;
}

