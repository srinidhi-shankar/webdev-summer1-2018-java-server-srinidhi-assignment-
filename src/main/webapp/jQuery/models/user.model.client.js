function User(username, password, firstName, lastName, phone, role, dob) {
	this.username = username;
	this.password = password;
	this.firstName = firstName;
	this.lastName = lastName;
	this.phone = phone;
	this.role = role;
	this.dob = dob;
	var self = this;

	this.setUsername = setUsername;
	this.getUsername = getUsername;
	this.setPassword = setPassword;
	this.getPassword = getPassword;
	this.setFirstName = setFirstName;
	this.getFirstName = getFirstName;
	this.setLastName = setLastName;
	this.getLastName = getLastName;
	this.setPhone = setPhone;
	this.getPhone = getPhone;
	this.setRole = setRole;
	this.getRole = getRole;
	this.setDob = setDob;
	this.getDob = getDob;

	function setUsername(username) {
		self.username = username;
	}
	function getUsername() {
		return self.username;
	}

	function setPassword(password) {
		self.password = password;
	}
	function getPassword() {
		return self.password;
	}

	function setFirstName(firstName) {
		self.firstName = firstName;
	}
	function getFirstName() {
		return self.firstName;
	}

	function setLastName(lastName) {
		self.lastName = LastName;
	}
	function getLastName() {
		return self.lastName;
	}

	function setPhone(phone) {
		self.phone = phone;
	}
	function getPhone() {
		return self.phone;
	}

	function setRole(role) {
		self.role = role;
	}
	function getRole() {
		return self.role;
	}

	function setDob(dob) {
		self.dob = dob;
	}
	function getDob() {
		return self.dob;
	}
}
