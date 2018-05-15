//IIFE
(function () {
    var $usernameFld, $passwordFld;
    var $removeBtn, $editBtn, $createBtn;
    var $firstNameFld, $lastNameFld;
    var $userRowTemplate, $tbody;
    var userService = new AdminUserServiceClient();
    $(main);

    function main() { 
    	$userRowTemplate = $('.wbdv-template');
		$tbody = $('.wbdv-tbody');
		
		findAllUsers();
		$(".wbdv-create").click(createUser);
    }
    
    function createUser() {   
    	var username = $("#usernameFld").val(); 
    	var password = $("#passwordFld").val(); 
    	var fname = $("#fnameFld").val(); 
    	var lname = $("#lnameFld").val();
    	var user = new User(username, password, fname, lname, phone, role, dob);
    		  
    	userService.createUser(user).then(findAllUsers); 
    }
    
    
    function findAllUsers() { 
    	userService.findAllUsers().then(renderUsers);	
    }
    
    function findUserById(event) { 
    	var editBtn = $(event.currentTarget);
        var userId = editBtn.attr('id');
        
        userService
        .findUserById(userId)
        .then(renderUser);
	
    }
    
    function deleteUser(event) { 
    	var deleteBtn = $(event.currentTarget);
        var userId = deleteBtn.attr('id');

        userService
            .deleteUser(userId)
            .then(findAllUsers);
    	
    }
    
    //function selectUser() { … }
    function updateUser(event) { 
    	var updateBtn = $(event.currentTarget);
        var userId = updateBtn.attr('id');
        
    	var username = $('#userameFld').val();
    	var password = $('#passwordFld').val();
        var firstName = $('#firstNameFld').val();
        var lastName = $('#lastNameFld').val();
        var role = $('#roleFld').val();
        

        var user = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            role:role
        };

        userService
            .updateUser(user)
            .then(findAllUsers);
    }
    
    function renderUser(user) {  
    	$("#usernameFld").val(user.username);
    	$("#passwordFld").val("****");
    	$("#firstNameFld").val(user.firstName);
    	$("#lastNameFld").val(user.lastName);
    	$("#roleFld").val(user.role);
    	$(".wbdv-update").attr("id",user.id);
    	$(".wbdv-update").click(updateUser);
    }
    
    function renderUsers(users) { 
    	// TODO: Check the user object that's coming from the server. If
		// possible, change it to user object defined in client
    	$tbody.empty();
        for(var i=0; i<users.length; i++) {
            var user = users[i];
            var clone = $userRowTemplate.clone();

            clone.attr('id', user.id);
            clone.find(".wbdv-remove").attr("id",user.id);
            clone.find(".wbdv-edit").attr("id",user.id);
            clone.find('.wbdv-remove').click(deleteUser);
            clone.find('.wbdv-edit').click(editUser);
            
            clone.find('.wbdv-username')
                .val(user.username);
            $tbody.append(clone);
        }
    }
    
})();

/*
 * (function() {
 * 
 * var tbody; var template;
 * 
 * var $usernameFld, $passwordFld; var $removeBtn, $editBtn, $createBtn; var
 * $firstNameFld, $lastNameFld; var $userRowTemplate, $tbody;
 * 
 * var userService = new UserServiceClient();
 * 
 * $(main); function main() {
 * 
 * template = $('.template'); tbody = $('tbody');
 * 
 * findAllUsers(); $("#createUser").click(createUser); }
 * 
 * function findAllUsers() { userService.findAllUsers().then(renderUsers); }
 * 
 * function renderUsers(users) { tbody.html(""); for (var i = 0; i <
 * users.length; i++) { console.log(users[i].username); var clone =
 * template.clone(); clone.attr("id",users[i].id);
 * clone.find('.delete').click(deleteUser); clone.find('.edit').click(editUser);
 * clone.find('.username').html(users[i].username);
 * clone.find('.password').html("****");
 * clone.find('.fname').html(users[i].fname);
 * clone.find('.lname').html(users[i].lname);
 * 
 * tbody.append(clone) } }
 * 
 * function createUser() { var username = $("#usernameFld").val(); var password =
 * $("#passwordFld").val(); var fname = $("#fnameFld").val(); var lname =
 * $("#lnameFld").val();
 * 
 * var user = { username : username, password : password, fname : fname, lname :
 * lname };
 * 
 * userService.createUser(user).then(findAllUsers); }
 * 
 * function deleteUser(event){ var target = $(event.currentTarget) var userid =
 * target.parent().parent().attr("id");
 * userService.deleteUser(userid).then(findAllUsers); }
 * 
 * function editUser(event){ console.log("edit:"+event) }
 * 
 * })();
 */