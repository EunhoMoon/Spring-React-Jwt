package study.janek.springreactjwt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import study.janek.springreactjwt.dto.BoardInfoDto;
import study.janek.springreactjwt.model.Board;
import study.janek.springreactjwt.model.PageNation;
import study.janek.springreactjwt.service.BoardService;

@RestController
public class BoardApiController {

	@Autowired
	public BoardService boardService;
	
	@GetMapping("/api/getBoardList/{pNum}")
	public PageNation getBoardList(@PathVariable int pNum, @RequestParam String search, @RequestParam String keyword, @RequestParam String isOnly) {
		if (keyword == "") {
			search = "";
			keyword = "";
		}
		boolean isO = isOnly.equals("y") ? true : false;
		return boardService.getBoardList(pNum, search, keyword, isO);
	}
	
	@GetMapping("/api/getBoardItem/{boardId}")
	public BoardInfoDto getBoardItem(@RequestHeader("Authorization") String jwtToken, @PathVariable int boardId) {
		return boardService.getBoardItem(jwtToken, boardId);
	}
	
	@PostMapping("/api/board/insertBoard")
	public ResponseEntity<?> insertBoard(@RequestHeader("Authorization") String jwtToken, String title, String content) {
		Board board = new Board();
		board.setTitle(title);
		board.setContent(content);
		return new ResponseEntity<>(boardService.insertBoard(jwtToken, board), HttpStatus.CREATED);
	}
	
	@PostMapping("/api/setLike/{boardId}")
	public ResponseEntity<?> insertLike(@RequestHeader("Authorization") String jwtToken, @PathVariable Long boardId) {
		return new ResponseEntity<>(boardService.insertLike(jwtToken, boardId), HttpStatus.OK);
	}
	
	@DeleteMapping("/api/setLike/{boardId}")
	public ResponseEntity<?> deleteLike(@RequestHeader("Authorization") String jwtToken, @PathVariable Long boardId) {
		return new ResponseEntity<>(boardService.deleteLike(jwtToken, boardId), HttpStatus.OK);
	}
	
	@PostMapping("/api/deleteBoard/{boardId}")
	public ResponseEntity<?> deleteBoard(@RequestHeader("Authorization") String jwtToken, @PathVariable Long boardId) {
		boardService.deleteBoard(jwtToken, boardId);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/api/updateReadCnt/{boardId}")
	public void updateReadCnt(@PathVariable("boardId") int boardId) {
		boardService.updateReadCnt(boardId);
	}
	
	@PostMapping("/api/reply/insertReply/{boardId}")
	public int insertReply(@RequestHeader("Authorization") String jwtToken, @PathVariable Long boardId, String content) {
		return boardService.insertReply(jwtToken, boardId, content);
	}
	
	@PostMapping("/api/reply/updateReply/{replyId}")
	public int updateReply(@RequestHeader("Authorization") String jwtToken, @PathVariable Long replyId, String kind, String type) {
		System.out.println(jwtToken);
		System.out.println(replyId);
		System.out.println(kind);
		System.out.println(type);
		return boardService.updateReply(jwtToken, replyId, kind, type);
	}
}
