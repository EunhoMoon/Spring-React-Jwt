package study.janek.springreactjwt.model;

import java.util.List;

public class PageNation {

	private int pageSize;
	private List<?> list;

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public List<?> getList() {
		return list;
	}

	public void setList(List<?> list) {
		this.list = list;
	}

	public PageNation(int pageSize, List<?> list) {
		super();
		this.pageSize = pageSize;
		this.list = list;
	}

	@Override
	public String toString() {
		return "PageNation [pageSize=" + pageSize + ", list=" + list + "]";
	}

}
