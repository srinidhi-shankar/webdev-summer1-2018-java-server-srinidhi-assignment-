function UserServiceClient() {

	this.createUser = createUser;
	this.findAllUsers = findAllUsers;
	this.findUserById = findUserById;
	this.deleteUser = deleteUser;
	this.updateUser = updateUser;
	this.register = register;
	this.login = login;
	this.getProfile = getProfile;
	this.updateProfile = updateProfile;
	this.logout = logout;
	
	this.url = '/api/user';
	this.registerUrl = '/api/register';
	this.profileUrl = '/api/profile';
	this.loginUrl = '/api/login';
	this.logoutUrl = '/api/logout';
	var self = this;

	function login(username, password) {
		return fetch(self.loginUrl, {
			method : 'post',
			credentials: "same-origin",
			body : JSON.stringify({
				username : username,
				password : password
			}),
			headers : {
				'content-type' : 'application/json'
			}
		}).then(function(response){
			return response.json().catch(function(){
				return null;
			});
		});
	}

	function createUser(user) {
		return fetch(self.url, {
			method : "post",
			headers : {
				"content-type" : "application/json"
			},
			body : JSON.stringify(user)
		});
	}

	function findAllUsers() {
		return fetch(self.url).then(function(response) {
			return response.json();
		});
	}

	function deleteUser(id) {
		return fetch(self.url + "/" + id, {
			method : "delete",
		});
	}

	function findUserById(userid) {
		return fetch(self.url + "/" + userid).then(function(response) {
			return response.json();
		});
	}

	function updateUser(userId, user) {
		return fetch(self.url + "/" + userId, {
			method : "put",
			headers : {
				"content-type" : "application/json"
			},
			body : JSON.stringify(user)
		}).then(function(response) {
			return response.json().catch(function(){
				return null;
			});
		})
	}
	
	function getProfile(){
		return fetch(self.profileUrl,{
			method:"get",
			credentials:"same-origin"
		}).then(function(response) {
			return response.json().catch(function(){
				return null;
			});
		});
	}
	
	
	function updateProfile(user) {
		return fetch(self.profileUrl, {
			method : "put",
			credentials: "same-origin",
			headers : {
				"content-type" : "application/json"
			},
			body : JSON.stringify(user)
		}).then(function(response) {
			return response.json().catch(function(){
				return null;
			});
		})
	}
	
	function register(user){
		return fetch(self.registerUrl, {
			method : "post",
			credentials: "same-origin",
			headers : {
				"content-type" : "application/json"
			},
			body : JSON.stringify(user)
		}).then(function(response) {
				return response.json().catch(function(){
					return null;
				});
		});
	}
	
	function logout(){
		return fetch(self.logoutUrl, {
			method : "post",
			credentials: "same-origin"
		});
	}
	
}
