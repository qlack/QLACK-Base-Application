package com.eurodyn.qlack.baseapplication.config;

import com.eurodyn.qlack.baseapplication.service.TokenService;
import com.eurodyn.qlack.util.jwt.config.AppPropertiesUtilJwt;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.BooleanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Objects;
import java.util.UUID;


/**
 * A custom filter where create unique token and validate per request
 */
@Component
public final class CustomCookieFilter extends OncePerRequestFilter {

  @Value("${customCookieFilter.cookie-name}")
  private String cookieName;

  @Value("${customCookieFilter.cookie-timer}")
  private int cookieTimer;

  @Value("${customCookieFilter.login-path}")
  private String loginPath;

  @Value("${customCookieFilter.logout-path}")
  private String logoutPath;

  private final TokenService tokenService;
  private final AppPropertiesUtilJwt appProperties;

  public CustomCookieFilter(TokenService tokenService, AppPropertiesUtilJwt appProperties) {
    this.tokenService = tokenService;
    this.appProperties = appProperties;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {
    RequestMatcher loginPathRequestMatcher = new DynamicPathRequestMatcher(loginPath);
    RequestMatcher logoutPathRequestMatcher = new DynamicPathRequestMatcher(logoutPath);
    //if the path it is the logout ignore filter
    if(BooleanUtils.isTrue(logoutPathRequestMatcher.matches(request))){
      response.setStatus(200);
      return;
    }
    Date tokenTime = new Date(Instant.now().plus(appProperties.getJwtTtlMinutes(),
        ChronoUnit.MINUTES).toEpochMilli());
    //validate token in every request expect login and logout
    if (BooleanUtils.isFalse(loginPathRequestMatcher.matches(request))) {
      tokenTime = extractTimeFromJwtToken(request, tokenTime);
      var clientToken = extractTokenFromCookie(request);
      boolean invalidToken = invalidToken(clientToken);
      if (invalidToken) {
        tokenService.removeToken(clientToken);
        response.sendError(HttpServletResponse.SC_FORBIDDEN, "Invalid Token");
        return;
      }
      tokenService.updateToken(clientToken,
          new Date(Instant.now().plus(cookieTimer, ChronoUnit.SECONDS).toEpochMilli()));
    }
    //generate token in every request and set it on cookie, expect the logout
    var generateToken = generateRandomToken();
    Cookie cookie = new Cookie(cookieName, generateToken);
    cookie.setPath("/");
    response.addCookie(cookie);
    tokenService.updateToken(generateToken, tokenTime);
    filterChain.doFilter(request, response);
  }

  private Date extractTimeFromJwtToken(HttpServletRequest request, Date tokenTime) {
    String userAuthorizationHeaderJwt = request.getHeader("Authorization");
    //get remaining time off jwt token
    if (Objects.nonNull(userAuthorizationHeaderJwt)) {
      String jwt = userAuthorizationHeaderJwt.substring(7);
      byte[] apiKeySecretBytes2 = appProperties.getJwtSecret().getBytes();
      Claims claims = Jwts.parser()
          .setSigningKey(apiKeySecretBytes2)
          .parseClaimsJws(jwt).getBody();
      tokenTime = claims.getExpiration();
    }
    return tokenTime;
  }

  private boolean invalidToken(String key){
    var getTokens = tokenService.getCachedTokens();
    var tokenTime = getTokens.get(key);
    return Objects.isNull(key) || CollectionUtils.isEmpty(getTokens)
        || Objects.isNull(tokenTime)
        || tokenTime.before(new Date(Instant.now().toEpochMilli()));
  }

  private String extractTokenFromCookie(HttpServletRequest request) {
    Cookie[] cookies = request.getCookies();
    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if (cookieName.equals(cookie.getName())) {
          return cookie.getValue();
        }
      }
    }
    return null;
  }

  private String generateRandomToken() {
    return UUID.randomUUID().toString();
  }
}
