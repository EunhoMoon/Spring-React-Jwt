package study.janek.springreactjwt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import study.janek.springreactjwt.mapper.BoardMapper;
import study.janek.springreactjwt.model.Board;
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
		PageNation result = new PageNation(listSize, boardList);
		
		System.out.println("result : " + result);
		return result;
	}
	
}
