package study.janek.springreactjwt.dto;

import java.util.List;

import study.janek.springreactjwt.model.Board;
import study.janek.springreactjwt.model.Reply;

public class BoardInfoDto {

	private Board board;
	private Boolean isLike;
	private Boolean isWriter;
	private List<Reply> replyList;

	public Board getBoard() {
		return board;
	}

	public void setBoard(Board board) {
		this.board = board;
	}

	public Boolean getIsLike() {
		return isLike;
	}

	public void setIsLike(Boolean isLike) {
		this.isLike = isLike;
	}

	public Boolean getIsWriter() {
		return isWriter;
	}

	public void setIsWriter(Boolean isWriter) {
		this.isWriter = isWriter;
	}

	public List<Reply> getReplyList() {
		return replyList;
	}

	public void setReplyList(List<Reply> replyList) {
		this.replyList = replyList;
	}

	@Override
	public String toString() {
		return "BoardInfoDto [board=" + board + ", isLike=" + isLike + ", isWriter=" + isWriter + "]";
	}

}
