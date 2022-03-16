package study.janek.springreactjwt.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import study.janek.springreactjwt.dto.SearchDto;
import study.janek.springreactjwt.model.User;

@Mapper
public interface AdminMapper {

	public List<User> getUserList(SearchDto searchDto);
	
	public int getListSize(SearchDto searchDto);
	
}
