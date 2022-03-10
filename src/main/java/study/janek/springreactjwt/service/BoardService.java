package study.janek.springreactjwt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import study.janek.springreactjwt.config.auth.jwt.JwtProperties;
import study.janek.springreactjwt.dto.BoardInfoDto;
import study.janek.springreactjwt.mapper.BoardMapper;
import study.janek.springreactjwt.model.Board;
import study.janek.springreactjwt.model.BoardLike;
import study.janek.springreactjwt.model.PageNation;

@Service
public class BoardService {

	@Autowired
	public BoardMapper boardMapper;

	public BoardService(BoardMapper boardMapper) {
		this.boardMapper = boardMapper;
	}

	public PageNation getBoardList(int pNum) {
		int sNum = (pNum - 1) * 10;
		int listSize = boardMapper.getListSize();
		List<Board> boardList = boardMapper.getBoardList(sNum);
		int num = listSize - 10 * (pNum - 1);

		for (Board board : boardList) {
			board.setNum(num);
			String date = board.getWriteDate();
			board.setWriteDate(date.substring(0, 10));
			num--;
		}

		listSize = listSize % 10 >= 1 ? listSize / 10 + 1 : listSize / 10;

		PageNation result = new PageNation(listSize, boardList);

		return result;
	}

	public BoardInfoDto getBoardItem(int boardId) {
		BoardInfoDto boardInfoDto = new BoardInfoDto();
		Board board = boardMapper.getBoardItem(boardId);
		List<BoardLike> boardLikes = boardMapper.getBoardLike(boardId);
		board.setWriteDate(board.getWriteDate().substring(0, 10) + " " + board.getWriteDate().substring(11, 16));

		boardInfoDto.setBoard(board);
		boardInfoDto.setBoardLike(boardLikes);
		
		return boardInfoDto;
	}
	
	public int insertBoard(String jwtToken, Board board) {
		jwtToken = jwtToken.replace(JwtProperties.TOKEN_PREFIX, "");
		String writer = 
				JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken).getClaim("username").asString();
		board.setWriter(writer);
		
		return boardMapper.insertBoard(board);
	}

}
