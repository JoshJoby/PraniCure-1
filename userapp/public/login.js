let query =window.location.search
let url =new URLSearchParams(query)
let val=url.get('mode')
if(localStorage.getItem("prani")){
    window.location.href=`user-home.html?mode=${val}`
}
$("#create").on("click",function(){
    window.location.href=`signup.html?mode=${val}`
})


$("#login").on("click",function(){

    var name=$("#name").val();
    var pass=$("#pass").val();
    if(val==null){
        alert("select the type of user");
        setTimeout(function(){
        window.location.href='welcome.html'


    
    },1000)
    return;
    }
    if(name==''|| name==' '){
    //    alert("Invalid Mail")
        toastr.warning("Please Enter a valid Mail", "Mail  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        return;
        
           
        }
        if(pass=='' ){
        
        // alert("pass");
        toastr.warning("Please Enter valid Paaword having more that 5 characters", "Password  Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        return;
        
        
        }
        $.ajax({
            url:"https://pranicure.azurewebsites.net/login",
            type:"post",
            dataType: "json",
            data: { user:name,Pass:pass
            },
            success: function(res){
                console.log(res.response)
                if(res.status==200){
                    swal("Logged In Successfully")
                
                    localStorage.setItem('prani',`${res.response[0].user_id}-${res.response[0].user_type}`)
                    if(res.response[0].user_type=='user'){
                     setTimeout(function(){
                        window.location.href='indexuser.html'

                        },2000)
                    }
                    else{
                        setTimeout(function(){
                            window.location.href='indexngo.html'
    
                            },2000)
                    }
                   
                }
                else if(res.status==500){
                    swal("Failed", "No user exist with given Credentials ", "error");

                }
                else{
                    alert("No user ,,exist")
                }

            }
        })




})
