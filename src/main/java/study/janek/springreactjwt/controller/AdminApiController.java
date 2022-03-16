package study.janek.springreactjwt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import study.janek.springreactjwt.dto.UserInfoDto;
import study.janek.springreactjwt.model.PageNation;
import study.janek.springreactjwt.service.AdminService;

@RestController
public class AdminApiController {

	@Autowired
	public AdminService adminService;

	@GetMapping("/api/admin/getUserList/{pNum}")
	public PageNation getUserList(@PathVariable int pNum, @RequestParam String search, @RequestParam String keyword,
			@RequestParam String isOnly) {
		if (keyword == "") {
			search = "";
			keyword = "";
		}
		boolean isO = isOnly.equals("y") ? true : false;
		
		return adminService.getUserList(pNum, search, keyword, isO);
	}
	
	@GetMapping("/api/admin/getUserInfo/{username}")
	public UserInfoDto getUserInfo(@PathVariable String username) {
		return adminService.getUserInfo(username);
	}

}
