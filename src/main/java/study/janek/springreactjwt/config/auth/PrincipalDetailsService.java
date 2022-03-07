package study.janek.springreactjwt.config.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import study.janek.springreactjwt.mapper.UserMapper;
import study.janek.springreactjwt.model.User;

// http://localhost:9119/login => 동작을 하지 않는다.
@Service
public class PrincipalDetailsService implements UserDetailsService {

	@Autowired
	private UserMapper userMapper;
	
	public PrincipalDetailsService(UserMapper userMapper) {
		this.userMapper = userMapper;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println("PrincipalDetailsService의 loadUserByUsername 실행");
		User userEntity = userMapper.findByUsername(username);
		userMapper.loginProc(username);
		return new PrincipalDetails(userEntity);
	}
	
}
