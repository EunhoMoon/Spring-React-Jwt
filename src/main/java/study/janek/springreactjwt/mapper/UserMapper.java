package study.janek.springreactjwt.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import study.janek.springreactjwt.model.Board;
import study.janek.springreactjwt.model.User;

@Mapper
public interface UserMapper {
	
	public User findByUsername(String username);
	
	public int joinUser(User user);
	
	public void loginProc(String username);
	
	public String chkUserPass(String username);
	
	public int updatePass(String username, String newPass);
	
	public List<Board> getUserContents(String username);
	
}
