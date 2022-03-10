package study.janek.springreactjwt.dto;

import java.util.List;

import study.janek.springreactjwt.model.Board;
import study.janek.springreactjwt.model.User;

public class UserInfoDto {

	private User user;
	private List<Board> userContents;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Board> getUserContents() {
		return userContents;
	}

	public void setUserContents(List<Board> userContents) {
		this.userContents = userContents;
	}

	@Override
	public String toString() {
		return "UserInfoDto [user=" + user + ", userContents=" + userContents + "]";
	}

}
