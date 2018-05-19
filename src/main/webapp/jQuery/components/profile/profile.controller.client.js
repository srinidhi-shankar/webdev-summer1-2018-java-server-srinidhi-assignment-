//IIFE
(function() {

	var $staticUserName;
	var $phone;
	var $email;
	var $role;
	var $dob;
	var $updateBtn;

	userService = new UserServiceClient();

	$(init)
	function init() {
		$staticUserName = $("#usernameFld");
		$phone = $("#phoneFld");
		$role = $("#roleFld");
		$email = $("#emailFld");
		$dob = $("#dobFld");
		
		$updateBtn = $("#updateBtn").click(updateProfile);
		$updateBtn = $("#logoutBtn").click(logoutUser);
		//findUserById();
		getProfile();
		$(".wbdv-datePicker").datepicker();
	}

	function findUserById(userId) {
		userService.findUserById(userId).then(renderUser);
	}
	
	function getProfile(){
		userService.getProfile().then(renderUser);
	}

	function renderUser(user) {
		if(user!=null){
			$staticUserName.val(user.username);
			$phone.val(user.phone);
			$role.val(user.role);
			$email.val(user.email);
			$dob.val(user.dob);
		}
		else{
			alert("Could not fetch the user!");
		}
	}

	function updateProfile() {
		var user = new User($staticUserName.val(), "", "", "", $phone.val(), $role.val(), $dob.val(), $email.val());
		userService.updateProfile(user).then(success);
	}
	
	function logoutUser(){
		userService.logout().then(function(){
			window.location.href = "../login/login.template.client.html";
		});
	}

	function success(response) {
		if (response === null) {
			alert("Unable to update");
		} else {
			alert("Successfully updated!")
			window.location.href = window.location.href;	
		}

	}

	function getUrlVars() {
		var vars = [], hash;
		var hashes = window.location.href.slice(
				window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}

})();