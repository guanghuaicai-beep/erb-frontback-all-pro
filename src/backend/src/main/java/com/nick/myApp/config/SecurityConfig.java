package com.nick.myApp.config;

import java.util.Collections;
import java.util.Optional;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.nick.myApp.models.Users;
import com.nick.myApp.repos.UsersRepo;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UsersRepo usersRepo;

    public SecurityConfig(UsersRepo usersRepo) {
        this.usersRepo = usersRepo;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtFilter) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {})
            .authorizeHttpRequests(auth -> auth
                // 公開 API
                .requestMatchers(HttpMethod.POST, "/register").permitAll()
                .requestMatchers(HttpMethod.POST, "/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/logout").permitAll()
                .requestMatchers(HttpMethod.POST, "/forget_password").permitAll()
                .requestMatchers(HttpMethod.POST, "/reset_password").permitAll()
                .requestMatchers(HttpMethod.GET, "/courses/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/categories/**").permitAll()
                .requestMatchers("/error").permitAll()
                // 需要登入
                .requestMatchers("/cart/**").authenticated()
                .requestMatchers("/orders/**").authenticated()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            // 加入 JWT filter，但要排除 login/register
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return identifier -> {
            Optional<Users> userOpt = usersRepo.findByEmailIgnoreCase(identifier);
            if (userOpt.isEmpty()) {
                userOpt = usersRepo.findByMobile(identifier);
            }

            Users user = userOpt.orElseThrow(
                () -> new UsernameNotFoundException("User not found: " + identifier)
            );

            return new org.springframework.security.core.userdetails.User(
                identifier, // email 或 mobile
                user.getPassword(), // 加密密碼
                Collections.emptyList()
            );
        };
    }
}
