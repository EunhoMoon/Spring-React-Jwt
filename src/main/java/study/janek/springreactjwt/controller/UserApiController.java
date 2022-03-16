package study.janek.springreactjwt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import study.janek.springreactjwt.dto.UserInfoDto;
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
		User user = userService.findUsername(username);
		
		return user;
	}
	
	@PostMapping("/api/user/info")
	public UserInfoDto userInfo(@RequestHeader("Authorization") String jwtToken) {
		UserInfoDto userInfoDto = userService.userInfo(jwtToken);
		
		return userInfoDto;
	}
	
	@PostMapping("/api/user/chkUserPass")
	public int chkUserPass(@RequestHeader("Authorization") String jwtToken, String oldPass) {
		return userService.chkUserPass(jwtToken, oldPass);
	}
	
	@PostMapping("/api/user/updateUser")
	public int updateUser(@RequestHeader("Authorization") String jwtToken, String email, String password) {
		return userService.updateUser(jwtToken, email, password);
	}
	
	@PostMapping("/api/user/updatePass")
	public ResponseEntity<?> updatePass(@RequestHeader("Authorization") String jwtToken, String newPass) {
		return new ResponseEntity<>(userService.updatePass(jwtToken, newPass), HttpStatus.OK);
	}
	
}
