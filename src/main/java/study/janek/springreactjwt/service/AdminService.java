package study.janek.springreactjwt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import study.janek.springreactjwt.dto.SearchDto;
import study.janek.springreactjwt.mapper.AdminMapper;
import study.janek.springreactjwt.model.Board;
import study.janek.springreactjwt.model.PageNation;
import study.janek.springreactjwt.model.User;

@Service
public class AdminService {

	@Autowired
	public AdminMapper adminMapper;
	
	public AdminService(AdminMapper adminMapper) {
		this.adminMapper = adminMapper;
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
	
}
