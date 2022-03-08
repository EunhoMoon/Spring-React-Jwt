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
	
	public int chkUserPass(String jwtToken, String oldPass) {
		jwtToken = jwtToken.replace(JwtProperties.TOKEN_PREFIX, "");
		String username = 
				JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken).getClaim("username").asString();
		String encodePass = userMapper.chkUserPass(username);
		
		boolean isMatch = bCryptPasswordEncoder.matches(oldPass, encodePass);
		
		int result = isMatch ? 1 : 0;
		
		return result;
	}
	
	public User userInfo(String jwtToken) {
		jwtToken = jwtToken.replace(JwtProperties.TOKEN_PREFIX, "");
		String username = 
				JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken).getClaim("username").asString();
		User user = userMapper.findByUsername(username);
		user.setJoinDate(user.getJoinDate().substring(0, 10));
		
		return user;
	}
	
	public int updatePass(String jwtToken, String newPass) {
		jwtToken = jwtToken.replace(JwtProperties.TOKEN_PREFIX, "");
		String username = 
				JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken).getClaim("username").asString();
		newPass = bCryptPasswordEncoder.encode(newPass);
		
		return userMapper.updatePass(username, newPass);
	}
	
}
