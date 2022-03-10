package study.janek.springreactjwt.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import study.janek.springreactjwt.model.Board;

@Mapper
public interface BoardMapper {

	public List<Board> getBoardList(int sNum);
	
	public int getListSize();
	
	public Board getBoardItem(int boardId);
	
	public int insertBoard(Board board);
	
}
