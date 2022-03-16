package study.janek.springreactjwt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import study.janek.springreactjwt.dto.SearchDto;
import study.janek.springreactjwt.dto.UserInfoDto;
import study.janek.springreactjwt.mapper.AdminMapper;
import study.janek.springreactjwt.mapper.UserMapper;
import study.janek.springreactjwt.model.Board;
import study.janek.springreactjwt.model.PageNation;
import study.janek.springreactjwt.model.User;

@Service
public class AdminService {

	@Autowired
	public AdminMapper adminMapper;
	
	@Autowired
	public UserMapper userMapper;
	
	public AdminService(AdminMapper adminMapper, UserMapper userMapper) {
		this.adminMapper = adminMapper;
		this.userMapper = userMapper;
	}
	
	public PageNation getUserList(int pNum, String search, String keyword, boolean isOnly) {
		int sNum = (pNum - 1) * 10;
		SearchDto searchDto = new SearchDto(sNum, search, keyword, isOnly);
		int listSize = adminMapper.getListSize(searchDto);
		List<User> userList = adminMapper.getUserList(searchDto);
		
		for (User user : userList) {
			user.setJoinDate(user.getJoinDate().substring(0, 10));
			if (user.getLastLogin() != null) {
				user.setLastLogin(user.getLastLogin().substring(0, 10));
			} else {
				user.setLastLogin("로그인 정보 없음");
			}
		}
		
		listSize = listSize % 10 >= 1 ? listSize / 10 + 1 : listSize / 10;
		
		PageNation result = new PageNation(listSize, userList);
		
		return result;
	}
	
	public UserInfoDto getUserInfo(String username) {
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
	
}
