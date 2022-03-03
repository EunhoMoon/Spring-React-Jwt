package study.janek.springreactjwt.config.auth.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import study.janek.springreactjwt.config.auth.PrincipalDetails;
import study.janek.springreactjwt.mapper.UserMapper;
import study.janek.springreactjwt.model.User;

// 권한이나 인증이 필요한 특정 주소를 요청했을 때 Security가 가진 필터 중 BasicAuthenticationFilter를 무조건 타게되어 있다.
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

	private UserMapper userMapper;
	
	public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserMapper userMapper) {
		super(authenticationManager);
		this.userMapper = userMapper;
	}

	// 인증이나 권한이 필요한 주소요청이 있을 때 해당 필터를 타게 된다.
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		String jwtHeader = request.getHeader("Authorization");
		
		// Header가 있는지 확인
		if (jwtHeader == null || !jwtHeader.startsWith("Bearer")) {
			chain.doFilter(request, response);
			return;
		}
		// JWT 토큰을 검증해서 정상적인 사용자인지 확인
		String jwtToken = request.getHeader(JwtProperties.HEADER_STRING).replace(JwtProperties.TOKEN_PREFIX, "");
		
		String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(jwtToken).getClaim("username").asString();
		
		// 서명이 정상적일 때
		if (username != null) {
			User userEntity = userMapper.findByUsername(username);
			
			PrincipalDetails principalDetails = new PrincipalDetails(userEntity);
			
			// Jwt 토큰 서명을 통해서 서명이 정상이면 Authentication 객체를 만들어 준다.
			Authentication authentication =
					new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
			
			// 강제로 시큐리티의 세션에 접근하여 Authentication 객체를 저장
			SecurityContextHolder.getContext().setAuthentication(authentication);
			
			chain.doFilter(request, response);
		}
	}

}


