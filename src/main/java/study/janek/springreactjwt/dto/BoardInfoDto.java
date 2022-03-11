package study.janek.springreactjwt.dto;

import study.janek.springreactjwt.model.Board;

public class BoardInfoDto {

	private Board board;
	private Boolean isLike;
	private Boolean isWriter;

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

	@Override
	public String toString() {
		return "BoardInfoDto [board=" + board + ", isLike=" + isLike + ", isWriter=" + isWriter + "]";
	}

}
