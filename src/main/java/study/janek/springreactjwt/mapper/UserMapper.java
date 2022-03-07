package study.janek.springreactjwt.mapper;

import org.apache.ibatis.annotations.Mapper;

import study.janek.springreactjwt.model.User;

@Mapper
public interface UserMapper {
	
	public User findByUsername(String username);
	
	public int joinUser(User user);
	
	public void loginProc(String username);
	
	public int chkUserPass(String username, String password);
	
}
