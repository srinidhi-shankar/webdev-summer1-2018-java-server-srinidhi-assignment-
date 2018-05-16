
(function () {
    var $usernameFld, $passwordFld;
    var $loginBtn;
    var userService = new UserServiceClient();
    
    $(main);

    function main() { 
    	$("#loginBtn").click(login); 		
    }
    
    function login() { 
    	var username = $("#usernameFld").val();
    	var password = $("#passwordFld").val();
    	userService.login(username,password).then(handleLogin);
    }
    
    function handleLogin(user){
    	if(user!=null){
    		window.location.href = "../user-admin/user-admin.template.client.html";
    	}
    	else{
    		alert("Invalid Credentials!");
    	}
    }
})();
