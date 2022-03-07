package study.janek.springreactjwt.config.auth.jwt;

import java.io.IOException;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;

import study.janek.springreactjwt.config.auth.PrincipalDetails;
import study.janek.springreactjwt.mapper.UserMapper;
import study.janek.springreactjwt.model.User;

// SpringSecurity의 UsernamePasswordAuthenticationFilter를 상속
// '/login'요청에서 username, password를 post로 전송하면 동작 but 동작안함(SecurityConfig 설정)
// 따라서 SecurityConfig에 다시 등록해주어야 한다.
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private final AuthenticationManager authenticationManager;


	public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		System.out.println("JwtAuthenticationFilter : 로그인 시도 중");
		
		// 1. username, password를 받음
		try {
//			BufferedReader br = request.getReader();
//			
//			String input = null;
//			while ((input = br.readLine()) != null) {
//				System.out.println(input);
//			}
			ObjectMapper om = new ObjectMapper();
			User user  = om.readValue(request.getInputStream(), User.class);
			System.out.println(user);
			
			UsernamePasswordAuthenticationToken authenticationToken = 
					new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
			
			// PrincipalDetailsService의 loadUserByUsername() 함수가 실행된 후 문제가 없다면 authentication이 리턴됨
			// DB에 있는 username과 password가 일치한다.
			Authentication authentication = authenticationManager.authenticate(authenticationToken);
			
			// authentication 객체가 session 영역에 저장된다. => 로그인이 되었다는 뜻
			PrincipalDetails principalDetails = (PrincipalDetails)authentication.getPrincipal();
			System.out.println("로그인 완료됨 : " + principalDetails.getUser().getUsername());	// 값이 있다면 로그인이 정상적으로 된 것
			
			return authentication;	
			// authentication 객체가 session 영역에 저장되는 방법이 return 해주는 것
			// 리턴의 이유는 권한 관리를 security가 대신 해주기 때문(단지 권한 처리 때문에 session에 넣어준다.)
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		// 2. 정상적인 로그인 시도인지 확인(authenticationManager로 로그인 시도시 PrincipalDetailsService가 호출)
		
		// 3. PrincipalDetails를 세션에 담고
		
		// 4. JWT 토큰을 만들어서 응답해주면 된다.
		
		return null;
	}
	
	// attemptAuthentication 실행 후 인증이 정상적으로 되었으면 successfulAuthentication 함수 실행
	// JWT 토큰을 만들어서 request 요청한 사용자에게 JWT토큰을 response해주면 된다.
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		System.out.println("successfulAuthentication 실행됨 : 인증 완료");
		PrincipalDetails principalDetails = (PrincipalDetails)authResult.getPrincipal();
		
		String jwtToken = JWT.create()
				.withSubject("janek token")
				.withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
				.withClaim("id", principalDetails.getUser().getId())
				.withClaim("username", principalDetails.getUser().getUsername())
				.sign(Algorithm.HMAC512(JwtProperties.SECRET));
		
		response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken);
	}
}
