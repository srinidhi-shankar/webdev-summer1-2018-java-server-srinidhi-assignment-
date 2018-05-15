function UserServiceClient() {

	this.createUser = createUser;
	this.findAllUsers = findAllUsers;
	this.findUserById = findUserById;
	this.deleteUser = deleteUser;
	this.updateUser = updateUser;
	this.url = '/api/user';
	this.loginUrl = '/api/login';
	var self = this;
	
	function login(username, password) {
        return fetch(self.login, {
            method: 'post',
            body: JSON.stringify({username:username, password: password}),
            headers: {
                'content-type': 'application/json'
            }
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
			return response;
		})
	}
}
