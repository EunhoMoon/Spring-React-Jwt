package study.janek.springreactjwt.mapper;

import org.apache.ibatis.annotations.Mapper;

import study.janek.springreactjwt.model.User;

@Mapper
public interface UserMapper {
	
	public User findByUsername(String username);
	
	public void joinUser(User user);
	
}
