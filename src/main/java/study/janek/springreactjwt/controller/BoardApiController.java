package study.janek.springreactjwt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
}
