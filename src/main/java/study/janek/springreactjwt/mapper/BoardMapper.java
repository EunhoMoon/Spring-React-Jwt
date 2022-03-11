package study.janek.springreactjwt.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import study.janek.springreactjwt.dto.SearchDto;
import study.janek.springreactjwt.model.Board;
import study.janek.springreactjwt.model.BoardLike;

@Mapper
public interface BoardMapper {

	public List<Board> getBoardList(SearchDto searchDto);
	
	public int getListSize(SearchDto searchDto);
	
	public Board getBoardItem(int boardId);
	
	public List<BoardLike> getBoardLike(int boardId);
	
	public int insertBoard(Board board);
	
	public int insertLike(BoardLike boardLike);

	public int deleteLike(BoardLike boardLike);
	
	public Board deleteBoard(Board board);
}
