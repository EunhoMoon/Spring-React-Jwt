package study.janek.springreactjwt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import study.janek.springreactjwt.mapper.UserMapper;
import study.janek.springreactjwt.model.User;
import study.janek.springreactjwt.service.UserService;

@RestController
public class UserApiController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/home")
	public String home() {
		return "<h1>Home</h1>";
	}
	
	@PostMapping("/api/join")
	public ResponseEntity<?> join(@RequestBody User user) {
		return new ResponseEntity<>(userService.joinUser(user), HttpStatus.CREATED);
	}
	
	@GetMapping("/api/findUsername/{username}")
	public User findUsername(@PathVariable("username") String username) {
		System.out.println("username : " + username);
		User user = userService.findUsername(username);
		System.out.println(user);
		return user;
	}
	
	@PostMapping("/api/chkUserPass")
	public int chkUserPass(@RequestHeader("Authorization") String jwtToken, String oldPass) {
		return userService.chkUserPass(jwtToken, oldPass);
	}
	
	@PostMapping("/api/user/info")
	public User userInfo(@RequestHeader("Authorization") String jwtToken) {
		User user = userService.userInfo(jwtToken);
		
		return user;
	}
	
	@GetMapping("/api/admin")
	public String admin() {
		return "admin";
	}
}
