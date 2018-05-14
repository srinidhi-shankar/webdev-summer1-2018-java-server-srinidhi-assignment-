//IIFE
(function() {

	var tbody;
	var template;
	var userService = new UserServiceClient();

	$(main);
	function main() {

		template = $('.template');
		tbody = $('tbody');
		
		findAllUsers();
		$("#createUser").click(createUser);
		
	}

	function findAllUsers() {
		userService.findAllUsers().then(renderUsers);
	}

	function renderUsers(users) {
		tbody.html("");
		for (var i = 0; i < users.length; i++) {
			console.log(users[i].username);
			var clone = template.clone();
			clone.attr("id",users[i].id);
			clone.find('.delete').click(deleteUser);
			clone.find('.edit').click(editUser);
			clone.find('.username').html(users[i].username);
			clone.find('.password').html("****");
			clone.find('.fname').html(users[i].fname);
			clone.find('.lname').html(users[i].lname);

			tbody.append(clone)
		}
	}

	function createUser() {
		var username = $("#usernameFld").val();
		var password = $("#passwordFld").val();
		var fname = $("#fnameFld").val();
		var lname = $("#lnameFld").val();

		var user = {
			username : username,
			password : password,
			fname : fname,
			lname : lname
		};

		userService.createUser(user).then(findAllUsers);
	}
	
	function deleteUser(event){
		var target = $(event.currentTarget)
		var userid = target.parent().parent().attr("id");
		userService.deleteUser(userid).then(findAllUsers);
	}
	
	function editUser(event){
		console.log("edit:"+event)
	}
	
})();
