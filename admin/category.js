//display();
// Insert category
//document.getElementById("catdata").addEventListener("click", () => {
    function add_category(){
    var msg = '';
    let cat = document.catform.catname.value;
    let uid = document.catform.uid.value;
    let getdata = localStorage.getItem("categoryData");
    // create blank object [localstorege formate]
    let data = {};
    let dt = {
        id: 1,
        name: cat
    }
    if (getdata != null) {
        getdata =  JSON.parse(getdata);
        if (uid.length != 0) {
            for(let i=0; i<getdata.length;i++){
                if(uid == getdata[i].id){
                    getdata[i].name = cat;
                    msg = `Category id#${uid} Updated Successfully.`;
                }
            }

            document.getElementById('uid').value = '';
        } else {
           
            let len = getdata.length;
            dt = {
                id: len + 1,
                name: cat
            }
            msg = `Category id #${dt.id} Added Successfully.`;
            getdata.push(dt);
   
        }
        localStorage.setItem("categoryData", JSON.stringify(getdata));
    } else {
        data = [dt];
        localStorage.setItem("categoryData", JSON.stringify(data));
    }
    window.location.href = "category.html?msg="+msg;
    return false;
    //document.catform.reset();
    //var meta = document.createElement('<meta http-equiv = "refresh" content = "2; url = https://www.tutorialspoint.com" />');
     //document.getElementsByName("head")[0].appendChild(meta);
   // display();

    }
//});
function display() {
    let d1 = '';

    let d2 = JSON.parse(localStorage.getItem("categoryData"));

    if (d2 != null) {
        d1 += "<thead>";
        d1 += "<tr>";
        d1 += "<th class=\"border-top-0\">ID</th>";
        d1 += "<th class=\"border-top-0\">Name</th>";
        d1 += "<th class=\"border-top-0\">Action</th>";                            
        d1 += "</tr>";
        d1 += "</thead>";
        d1 += "<tbody>";
        for (i = 0; i < d2.length; i++) {
            
            let action_delete = "<input type='button' name='catdel' id='catdel' class=\"btn btn-danger text-white\" value='Delete' onclick='delCat(" + d2[i].id + ")'>";
            let action_edit = "<a href = 'category_add.html?cid="+d2[i].id+"' class=\"btn btn-success text-white\">Edit</a>";
            d1 += "<tr>";
            d1 += "<td>" + d2[i].id + "</td>";
            d1 += "<td>" + d2[i].name + "</td>";
            d1 += "<td>"+action_edit;
            d1 += "&nbsp;&nbsp;&nbsp;&nbsp;"+action_delete+"</td>";
            d1 += "</tr>";
        }
        d1 += "</tbody>";

    }
    document.getElementById('tbl').innerHTML = d1;
}

function delCat(id) {
    let user = localStorage.getItem("categoryData");
    if (user != null) {
        let id1 = id - 1;
        let disp = JSON.parse(user);
        disp.splice(id1, 1);
        let j = 1;
        for (let i = 0; i < disp.length; i++) {
            disp[i].id = j;
            j++;
        }
        localStorage.setItem("categoryData", JSON.stringify(disp));
        display();
    }
}

function editCat(id) {
    let editdata = localStorage.getItem("categoryData");
    let data = JSON.parse(editdata);

    for (let i = 0; i < data.length; i++) {
        if (id == data[i].id) {

            document.catform.catname.value = data[i].name;
            document.catform.uid.value = data[i].id;
        }
    }
}
