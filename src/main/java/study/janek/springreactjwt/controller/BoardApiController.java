package study.janek.springreactjwt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import study.janek.springreactjwt.model.Board;
import study.janek.springreactjwt.model.PageNation;
import study.janek.springreactjwt.service.BoardService;

@RestController
public class BoardApiController {

	@Autowired
	public BoardService boardService;
	
	@GetMapping("/api/getBoardList/{pNum}")
	public PageNation getBoardList(@PathVariable int pNum) {
		return boardService.getBoardList(pNum);
	}
	
	@GetMapping("/api/getBoardItem/{boardId}")
	public Board getBoardItem(@PathVariable int boardId) {
		return boardService.getBoardItem(boardId);
	}
	
	@PostMapping("/api/board/insertBoard")
	public ResponseEntity<?> insertBoard(@RequestHeader("Authorization") String jwtToken, String title, String content) {
		Board board = new Board();
		board.setTitle(title);
		board.setContent(content);
		return new ResponseEntity<>(boardService.insertBoard(jwtToken, board), HttpStatus.CREATED);
	}
	
}
