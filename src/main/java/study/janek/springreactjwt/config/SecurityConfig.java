package study.janek.springreactjwt.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.filter.CorsFilter;

import study.janek.springreactjwt.config.auth.jwt.JwtAuthenticationFilter;
import study.janek.springreactjwt.config.auth.jwt.JwtAuthorizationFilter;
import study.janek.springreactjwt.mapper.UserMapper;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private CorsFilter corsFilter;
	
	@Autowired
	private UserMapper userMapper;
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
//		http.addFilterBefore(new MyFilter1(), SecurityContextPersistenceFilter.class);
		http.csrf().disable();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and()
		.addFilter(corsFilter)
		.formLogin().disable()
		.httpBasic().disable()
		.addFilter(new JwtAuthenticationFilter(authenticationManager()))	// AuthenticationManager
		.addFilter(new JwtAuthorizationFilter(authenticationManager(), userMapper))
		.authorizeRequests()
		.antMatchers("/api/user/**")
		.access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
		.antMatchers("/api/reply/**")
		.access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
		.antMatchers("/api/admin/**")
		.access("hasRole('ROLE_ADMIN')")
		.anyRequest().permitAll();
	}
	
}
