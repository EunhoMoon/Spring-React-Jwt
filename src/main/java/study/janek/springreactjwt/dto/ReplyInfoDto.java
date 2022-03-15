package study.janek.springreactjwt.dto;

import study.janek.springreactjwt.model.Reply;

public class ReplyInfoDto {

	private Reply reply;
	private String gnb;
	private Boolean isWriter;
	private Boolean isBest;

	public Reply getReply() {
		return reply;
	}

	public void setReply(Reply reply) {
		this.reply = reply;
	}

	public String getGnb() {
		return gnb;
	}

	public void setGnb(String gnb) {
		this.gnb = gnb;
	}

	public Boolean getIsWriter() {
		return isWriter;
	}

	public void setIsWriter(Boolean isWriter) {
		this.isWriter = isWriter;
	}

	public Boolean getIsBest() {
		return isBest;
	}

	public void setIsBest(Boolean isBest) {
		this.isBest = isBest;
	}

}
