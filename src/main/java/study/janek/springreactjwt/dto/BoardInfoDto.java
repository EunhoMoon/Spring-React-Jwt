package study.janek.springreactjwt.dto;

import java.util.List;

import study.janek.springreactjwt.model.Board;
import study.janek.springreactjwt.model.BoardLike;

public class BoardInfoDto {
	
	private Board board;
	private List<BoardLike> boardLike;

	public Board getBoard() {
		return board;
	}

	public void setBoard(Board board) {
		this.board = board;
	}

	public List<BoardLike> getBoardLike() {
		return boardLike;
	}

	public void setBoardLike(List<BoardLike> boardLike) {
		this.boardLike = boardLike;
	}

	@Override
	public String toString() {
		return "BoardInfoDto [board=" + board + ", boardLike=" + boardLike + "]";
	}

}
