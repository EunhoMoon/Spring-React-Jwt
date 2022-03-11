package study.janek.springreactjwt.config.auth.jwt;

public interface JwtProperties {
	String SECRET = "janek";
	int EXPIRATION_TIME = 60000 * 100;
	String TOKEN_PREFIX = "Bearer ";
	String HEADER_STRING = "Authorization";
}
