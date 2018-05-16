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
		
		$updateBtn = $("#updateBtn").click(updateUser);
		$updateBtn = $("#logoutBtn").click(logoutUser);
		findUserById(getUrlVars()["userId"]);
		$(".wbdv-datePicker").datepicker();
	}

	function findUserById(userId) {
		userService.findUserById(userId).then(renderUser);
	}

	function renderUser(user) {
		$staticUserName.val(user.username);
		$phone.val(user.phone);
		$role.val(user.role);
		$email.val(user.email);
		$dob.val(user.dob);
	}

	function updateUser() {
		var user = new User($staticUserName.val(), "", "", "", $phone.val(), $role.val(), $dob.val(), $email.val());
		userService.updateUser(getUrlVars()["userId"], user).then(success);
	}
	
	function logoutUser(){
		window.location.href = "../login/login.template.client.html"
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