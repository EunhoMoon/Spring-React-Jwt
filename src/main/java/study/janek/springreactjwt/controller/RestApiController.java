package study.janek.springreactjwt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import study.janek.springreactjwt.mapper.UserMapper;
import study.janek.springreactjwt.model.User;
import study.janek.springreactjwt.service.UserService;

@RestController
public class RestApiController {

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserMapper userMapper;
	
	@GetMapping("/home")
	public String home() {
		return "<h1>Home</h1>";
	}
	
	@PostMapping("/token")
	public String token() {
		return "<h1>Token</h1>";
	}
	
	@PostMapping("/join")
	public String join(@RequestBody User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		userMapper.joinUser(user);
		return "회원가입 완료";
	}
	
	@PostMapping("/api/user/info")
	public User userInfo(@RequestHeader("Authorization") String jwtToken) {
		User user = userService.userInfo(jwtToken);
		System.out.println(user);
		return user;
	}
	
	@GetMapping("/api/admin")
	public String admin() {
		return "admin";
	}
}
