document.getElementById('btn').addEventListener("click", () => {
   let email = document.login.email.value;
   let pwd = document.login.pwd.value;
   let ls_login_detail = localStorage.getItem("loginDetail");
   ls_login_detail = ls_login_detail != null ? JSON.parse(ls_login_detail) : 0;
  
   if (ls_login_detail != 0) {
      console.log(ls_login_detail);
      if (email == ls_login_detail.email  && pwd == ls_login_detail.password) {
         ls_login_detail.is_login = true;
         localStorage.setItem("loginDetail", JSON.stringify(ls_login_detail));
         window.location.href="index.html"; 
      } else {
         alert("invalid login detail");
      }
   }
   document.login.reset();
});

function getQueryString(field, url) {
   var href = url ? url : window.location.href;
   var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
   var string = reg.exec(href);
   return string ? string[1] : null;
}