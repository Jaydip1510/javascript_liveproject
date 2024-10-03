let gd_image_data = '';
function category_list_option(){
    //display();
    var cat_html = '';
    let category_data = localStorage.getItem("categoryData");
    if(category_data != null)
    {
        category_data = JSON.parse(category_data);
            category_data.forEach(element => {

                cat_html+="<option value='"+element.id+"'>"+element.name+"</option>"
            });   
    }
    document.getElementById("category").innerHTML = cat_html;

}

function add_product(){
    var msg = '';
    let pdetail = {
        "product_id" : 0,
        "catogory_id": "",
        "catogory_name": "",
        "product_img": "",
        "product_name": "",
        "product_price":""
    };


    let category_data = localStorage.getItem("categoryData");
    if(category_data != null)
    {
        category_data = JSON.parse(category_data);
    }
    
    let pname = document.product.pname.value;
    let price = document.product.price.value;
    let catid = document.product.category.value;
    let proid = document.product.pid.value;
    
    
     
    let found = category_data.find(function (element) {
        return element.id == catid;
    });
    let catname = found.name;
    pdetail.catogory_id    = catid;
    pdetail.catogory_name  = catname;
    pdetail.product_name   = pname;
    pdetail.product_price  = price;
    pdetail.product_img =   gd_image_data;
    let data = localStorage.getItem("productDetail");
    if(data != null && data.length > 0){
        data = JSON.parse(data);
        if(proid.length > 0){
             for(let i = 0; i < data.length; i++){
                if(proid == data[i].product_id){
                data[i].product_img     = gd_image_data;
                data[i].product_name    = pname;
                data[i].product_price   = price;
                data[i].catogory_id     = catid;
                data[i].catogory_name   = catname;
                msg = `Product id#${proid} Updated Successfully.`;
              }
            }
            
        }else{
            pdetail.product_id = 1;
            let len = data.length;
            if(len > 0)
            {
                pdetail.product_id =  len + 1;
            }
            msg = `Product id#${pdetail.product_id} Added Successfully.`;
            data.push(pdetail);
        }
        localStorage.setItem("productDetail",JSON.stringify(data));
    }else{
        pdetail.product_id = 1;
        let pdata = [];
        pdata.push(pdetail);
        localStorage.setItem("productDetail",JSON.stringify(pdata));
    }
    document.product.reset();
    document.getElementById('image-preview').innerHTML = '';
    document.product.pid.value = '';
    window.location.href="product.html?msg="+msg;

}

function display(){
    let pdt = "<thead>";
      pdt += "<tr>";
      pdt +="<th>Id</th>";
      pdt +="<th width='10%'>Image</th>";
      pdt +="<th>Product Name</th>";
      pdt +="<th>Price</th>";
      pdt +="<th>Catogery Id</th>";
      pdt +="<th>Catogory Name</th>";
      pdt +="<th>Action</th>";
      pdt +="</tr>";
      pdt += "<thead>";

      let prd = localStorage.getItem("productDetail");

      if(prd != null && prd.length > 0 ){
        let prddetail = JSON.parse(prd);
         pdt +="<tbody>";
        for(let i = 0; i<prddetail.length;i++){

            //<a href="">Edit</>
            let action_edit = "<a href = 'product_add.html?pid="+prddetail[i].product_id+"&catid="+prddetail[i].catogory_id+"' class=\"btn btn-success text-white\">Edit</a>";
            let action_delete = "<input type='button' name='prddel' id='prddel' class=\"btn btn-danger text-white\" value='Delete' onclick='delete_product(" + prddetail[i].product_id + ")'>";
            pdt +="<tr>";
            pdt +="<td>"+prddetail[i].product_id+"</td>";
            pdt +="<td> <img src='"+prddetail[i].product_img+"' alt='' name='prod_img' id='prod_img' height='110px' width='110px'></td>";
            pdt +="<td>"+prddetail[i].product_name+"</td>";
            pdt +="<td>"+prddetail[i].product_price+"</td>";
            pdt +="<td>"+prddetail[i].catogory_id+"</td>";
            pdt +="<td>"+prddetail[i].catogory_name+"</td>";
            pdt += "";
            pdt += "<td>"+action_edit;
            pdt +="&nbsp;&nbsp;&nbsp;&nbsp;"+action_delete+"</td>";
            pdt +="</tr>";
            pdt +="<tbody>";
        }
      }
      document.getElementById("ptable").innerHTML = pdt;
}
function edit_product(id)
{

  let prodata = localStorage.getItem("productDetail");
  let data = JSON.parse(prodata);  
    for (let i = 0; i < data.length; i++) {
           if(id == data[i].product_id){
            document.product.pid.value = id;
            document.getElementById('image-preview').innerHTML = `
            <img src="${data[i].product_img}" alt="${data[i].product_name}" width="150" height="150">
        `;
        //
            gd_image_data = data[i].product_img;
            document.product.pname.value = data[i].product_name;
            document.product.price.value = data[i].product_price;
            document.product.cat_id.value = data[i].catogory_id;

           }  
  } 
}
function delete_product(id){
    let data = JSON.parse(localStorage.getItem("productDetail"));
    for (let i = 0; i < data.length; i++) {
        if(id == data[i].product_id){
         data.splice(i,1);
        // let j = 1;
        // for (let i = 0; i < data.length; i++) {
        //     data[i].id = j;
        //     j++;
        // }
        }
    }
    
    localStorage.setItem("productDetail",JSON.stringify(data));
    display();   
}
function readFile(input)
{
    const div = document.getElementById('image-preview');
    let file = input.files[0]; 
    let fileReader = new FileReader(); 
    fileReader.readAsDataURL(file); 
    fileReader.onload = function(e) {
        gd_image_data = e.target.result;
        div.innerHTML = `
            <img src="${e.target.result}" alt="${file.name}" width="150" height="150">
        `;    
    }; 
    fileReader.onerror = function() {
      alert(fileReader.error);
    }; 
    
}