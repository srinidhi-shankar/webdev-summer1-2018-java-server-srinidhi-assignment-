(function () {
    var $usernameFld, $passwordFld, $verifyPasswordFld;
    var $registerBtn;
    var userService = new UserServiceClient();
    $(main);

    function main() { 
    	$("#registerBtn").click(register); 	
    }
    
    function register() { 
    	var username = $("#usernameFld").val();
    	var password = $("#passwordFld").val();
    	var verifyPassword= $("#verifyPasswordFld").val();
    	
    	if(password !== verifyPassword){
    		alert("Passwords must match!")
    		return ;
    	}
    	
    	var user = new User(username, password, null, null,null,null,null);
    	userService.register(user).then(registerSuccess); 
    }
    
    function registerSuccess(user){
    	if(user!=null){
    		window.location.href = "../user-admin/user-admin.template.client.html"
    	}
    	else{
    		alert("Username already exists!")
    	}
    }
    
    function registerFailure(){
    	alert("Username already exists!");
    }
    
})();
