package study.janek.springreactjwt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import study.janek.springreactjwt.config.auth.jwt.JwtProperties;
import study.janek.springreactjwt.mapper.UserMapper;
import study.janek.springreactjwt.model.User;

@Service
public class UserService {

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private UserMapper userMapper;
	
	public UserService(UserMapper userMapper) {
		this.userMapper = userMapper;
	}
	
	public int joinUser(User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		
		return userMapper.joinUser(user);
	}
	
	public User findUsername(String username) {
		return userMapper.findByUsername(username);
	}
	
	public User userInfo(String jwtToken) {
		jwtToken = jwtToken.replace(JwtProperties.TOKEN_PREFIX, "");
		String username = 
				JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken).getClaim("username").asString();
		User user = userMapper.findByUsername(username);
		user.setJoinDate(user.getJoinDate().substring(0, 10));
		
		return user;
	}
	
}
