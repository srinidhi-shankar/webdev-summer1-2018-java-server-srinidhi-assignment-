package com.example.myapp.services;

import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.	bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.myapp.model.User;
import com.example.myapp.repositories.UserRepository;

@RestController
public class UserService {
	@Autowired
	UserRepository repository;

	@GetMapping("/api/user")
	public List<User> findAllUsers() {
		return (List<User>) repository.findAll();
	}

	@GetMapping("/api/user/{userId}")
	public User findUserById(@PathVariable("userId") int userId) {
		Optional<User> data = repository.findById(userId);
		if (data.isPresent()) {
			return data.get();
		}
		return null;
	}

	@PutMapping("/api/user/{userId}")
	public User updateUser(@PathVariable("userId") int userId, @RequestBody User newUser) {
		Optional<User> data = repository.findById(userId);
		if (data.isPresent()) {
			User user = data.get();
			user.setFirstName(newUser.getFirstName());
			user.setLastName(newUser.getLastName());
			user.setPassword(newUser.getPassword());
			user.setRole(newUser.getRole());

			return repository.save(user);
		}
		return null;
	}

	@PutMapping("/api/profile")
	public User updateProfile(@RequestBody User newUser, HttpSession session) {
		User currentUser = (User) session.getAttribute("currentUser");
		if (currentUser != null) {
			currentUser.setEmail(newUser.getEmail());
			currentUser.setPhone(newUser.getPhone());
			currentUser.setDob(newUser.getDob());
			currentUser.setRole(newUser.getRole());
			session.setAttribute("currentUser", currentUser);
			return repository.save(currentUser);
		}
		return null;
	}

	@GetMapping("/api/profile")
	public User getProfile(HttpSession session) {
		User currentUser = (User) session.getAttribute("currentUser");
		return currentUser;
	}

	@PostMapping("/api/login")
	public User login(@RequestBody User credentials, HttpSession session) {
		List<User> users = (List<User>) repository.findUserByCredentials(credentials.getUsername(),
				credentials.getPassword());

		if (users != null && users.size() > 0) {
			User user = users.get(0);
			session.setAttribute("currentUser", user);
			return user;
		}
		return null;
	}

	@PostMapping("/api/logout")
	public void logout(HttpSession session) {
		session.invalidate();
	}

	@PostMapping("/api/user")
	public User createUser(@RequestBody User user) {
		return repository.save(user);
	}

	@DeleteMapping("/api/user/{userId}")
	public void deleteUser(@PathVariable("userId") int id) {
		repository.deleteById(id);
	}

	@PostMapping("/api/register")
	public User register(@RequestBody User user, HttpSession session) {
		String username = user.getUsername();
		List<User> users = (List<User>) repository.findUserByUsername(username);
		if (users.size() == 0) {
			session.setAttribute("currentUser", user);
			return repository.save(user);
		} else {
			return null;
		}
	}

	// @GetMapping("/api/user/{userName}")
	// public List<User> findUserByUsername(@PathVariable("userName") String
	// userName) {
	// return (List<User>) repository.findUserByUsername(userName);
	// }

}
