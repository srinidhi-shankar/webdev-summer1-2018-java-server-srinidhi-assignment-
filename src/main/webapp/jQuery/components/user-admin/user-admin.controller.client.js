//IIFE
(function () {
    var $usernameFld, $passwordFld;
    var $removeBtn, $editBtn, $createBtn;
    var $firstNameFld, $lastNameFld;
    var $userRowTemplate, $tbody;
    var userService = new UserServiceClient();
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
    	var fname = $("#firstNameFld").val(); 
    	
    	var lname = $("#lastNameFld").val();
    	var role = $("#roleFld").val();
    	var user = new User(username, password, fname, lname,null,role,null,null);
    		  
    	userService.createUser(user).then(clearForm).then(findAllUsers); 
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
        
    	var username = $('#usernameFld').val();
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
            .updateUser(userId,user).then(clearForm)
            .then(findAllUsers);
    }
    
    function clearForm(){
    	var username = $('#usernameFld').val("");
    	var password = $('#passwordFld').val("");
        var firstName = $('#firstNameFld').val("");
        var lastName = $('#lastNameFld').val("");
        var role = $('#roleFld').val("");
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
            clone.find('.wbdv-edit').click(findUserById);
            
            clone.find('.wbdv-username')
                .html(user.username);
            clone.find('.wbdv-first-name')
            .html(user.firstName);
            clone.find('.wbdv-last-name')
            .html(user.lastName);
            clone.find('.wbdv-role')
            .html(user.role);
            
            $tbody.append(clone);
        }
    }
    
})();