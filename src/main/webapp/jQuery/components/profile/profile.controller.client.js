//IIFE
(function() {

	var $staticUserName;
	var $fname;
	var $lname;
	var $updateBtn;
	
	userService = new UserServiceClient();
	
	$(init)
	function init() {
		$staticUserName = $("#username");
		$fname = $("#fname");
		$lname = $("#lname");
		$$updateBtn = $("#updateBtn").click(updateUser);
		findUserById(getUrlVars()["userId"]);
	}

	function findUserById(userId) {
		userService.findUserById(userId).then(renderUser);
	}

	function renderUser(user) {
		$staticUserName.val(user.username);
		$fname.val(user.fname);
		$lname.val(user.lname);
	}

	function updateUser() {
		var user = {
			fname : $fname.val(),
			lname : $lname.val()
		};
		userService.updateUser(22, user).then(success);
	}
	
	function success(response){
		if(response===null){
			alert("Unable to update");	
		}
		else{
			alert("successfully updated");
		}
		
	}
	
	function getUrlVars()
	{
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
	}

})();