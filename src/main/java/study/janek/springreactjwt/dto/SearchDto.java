package study.janek.springreactjwt.dto;

public class SearchDto {
	private int sNum;
	private String search;
	private String keyword;
	private boolean isOnly;

	public int getsNum() {
		return sNum;
	}

	public void setsNum(int sNum) {
		this.sNum = sNum;
	}

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public boolean isOnly() {
		return isOnly;
	}

	public void setOnly(boolean isOnly) {
		this.isOnly = isOnly;
	}

	public SearchDto(int sNum, String search, String keyword, boolean isOnly) {
		super();
		this.sNum = sNum;
		this.search = search;
		this.keyword = keyword;
		this.isOnly = isOnly;
	}

	@Override
	public String toString() {
		return "SearchDto [sNum=" + sNum + ", search=" + search + ", keyword=" + keyword + "]";
	}

}
