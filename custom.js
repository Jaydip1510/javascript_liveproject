let storageData= localStorage.getItem("categoryData");
console.log("LocalStorage =>"+storageData);
let userdata =JSON.parse(storageData);


let row = '';
for(let i=0; i<userdata.length;i++){
   row += "<li><a class='dropdown-item' href='index.html?cat_id="+userdata[i].id+"'>"+userdata[i].name+"</a></li>";
}
document.getElementById('catid').innerHTML = row;