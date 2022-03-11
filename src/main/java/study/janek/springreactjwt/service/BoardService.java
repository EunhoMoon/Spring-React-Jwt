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
import study.janek.springreactjwt.model.User;

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

	public BoardInfoDto getBoardItem(String jwtToken, int boardId) {
	// 나중에 한 번 다시 보기
		BoardInfoDto boardInfoDto = new BoardInfoDto();
		Board board = boardMapper.getBoardItem(boardId);
		Boolean isTrue = false;
		List<BoardLike> boardLikes = boardMapper.getBoardLike(boardId);
		board.setWriteDate(board.getWriteDate().substring(0, 10) + " " + board.getWriteDate().substring(11, 16));

		if (jwtToken != null && jwtToken != "") {
			jwtToken = jwtToken.replace(JwtProperties.TOKEN_PREFIX, "");
			String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken)
					.getClaim("username").asString();
			isTrue = board.getWriter().equals(username) ? true : false;
			boardInfoDto.setIsWriter(isTrue);

			if (boardLikes != null) {
				int count = 0;
				for (BoardLike boardLike : boardLikes) {
					count = boardLike.getUsername().equals(username) ? count+1 : count;
				}
				isTrue = count > 0 ? true : false;
				boardInfoDto.setIsLike(isTrue);
			} else {
				boardInfoDto.setIsLike(false);
			}
		} else {
			boardInfoDto.setIsLike(false);
			boardInfoDto.setIsWriter(false);
		}

		boardInfoDto.setBoard(board);

		System.out.println(boardInfoDto);

		return boardInfoDto;
	}

	public int insertBoard(String jwtToken, Board board) {
		jwtToken = jwtToken.replace(JwtProperties.TOKEN_PREFIX, "");
		String writer = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken)
				.getClaim("username").asString();
		board.setWriter(writer);

		return boardMapper.insertBoard(board);
	}
	
	public int insertLike(String jwtToken, Long boardId) {
		BoardLike boardLike = new BoardLike();
		jwtToken = jwtToken.replace(JwtProperties.TOKEN_PREFIX, "");
		String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken)
				.getClaim("username").asString();
		boardLike.setId(boardId);
		boardLike.setUsername(username);
		
		return boardMapper.insertLike(boardLike);
	}
	
	public int deleteLike(String jwtToken, Long boardId) {
		BoardLike boardLike = new BoardLike();
		jwtToken = jwtToken.replace(JwtProperties.TOKEN_PREFIX, "");
		String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken)
				.getClaim("username").asString();
		boardLike.setId(boardId);
		boardLike.setUsername(username);
		
		return boardMapper.deleteLike(boardLike);
	}

	public void deleteBoard(String jwtToken, Long boardId) {
		Board board = new Board();
		jwtToken = jwtToken.replace(JwtProperties.TOKEN_PREFIX, "");
		String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken)
				.getClaim("username").asString();
		board.setId(boardId);
		board.setWriter(username);
		System.out.println("====================");
		System.out.println("id : " + boardId + " / name : " + username);
		System.out.println("====================");
		boardMapper.deleteBoard(board);
	}
	
}
