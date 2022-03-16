package study.janek.springreactjwt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import study.janek.springreactjwt.config.auth.jwt.JwtProperties;
import study.janek.springreactjwt.dto.UserInfoDto;
import study.janek.springreactjwt.mapper.UserMapper;
import study.janek.springreactjwt.model.Board;
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
	
	public UserInfoDto userInfo(String jwtToken) {
		jwtToken = jwtToken.replace(JwtProperties.TOKEN_PREFIX, "");
		String username = 
				JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken).getClaim("username").asString();
		User user = userMapper.findByUsername(username);
		UserInfoDto userInfoDto = new UserInfoDto();
		
		user.setJoinDate(user.getJoinDate().substring(0, 10));
		List<Board> userContents = userMapper.getUserContents(username);
		for (Board board : userContents) {
			String title = board.getTitle();
			board.setTitle(title.length() > 10 ? title.substring(0, 10) + "..." : title);
			board.setWriteDate(board.getWriteDate().substring(0, 10));
		}
		
		userInfoDto.setUser(user);
		userInfoDto.setUserContents(userContents);
		
		return userInfoDto;
	}
	
	public int updateUser(String jwtToken, String email, String password) {
		jwtToken = jwtToken.replace(JwtProperties.TOKEN_PREFIX, "");
		String username = 
				JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken).getClaim("username").asString();
		String encodePass = userMapper.chkUserPass(username);
		
		boolean isMatch = bCryptPasswordEncoder.matches(password, encodePass);
		if (isMatch) {
			return userMapper.updateUser(username, email);
		}
		return 0;
	}
	
	public int updatePass(String jwtToken, String newPass) {
		jwtToken = jwtToken.replace(JwtProperties.TOKEN_PREFIX, "");
		String username = 
				JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken).getClaim("username").asString();
		newPass = bCryptPasswordEncoder.encode(newPass);
		
		return userMapper.updatePass(username, newPass);
	}
	
	public User findByOAuthId(User user) {
		return userMapper.findByOAuthId(user);
	}
	
}
