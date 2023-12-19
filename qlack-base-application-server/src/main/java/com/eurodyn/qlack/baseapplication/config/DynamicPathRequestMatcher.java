package com.eurodyn.qlack.baseapplication.config;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

public class DynamicPathRequestMatcher implements RequestMatcher {

  private final String pathPattern;

  public DynamicPathRequestMatcher(String pathPattern) {
    this.pathPattern = pathPattern;
  }

  @Override
  public boolean matches(HttpServletRequest request) {
    // Use the AntPathRequestMatcher to match the request path
    AntPathRequestMatcher matcher = new AntPathRequestMatcher(pathPattern);
    return matcher.matches(request);
  }

}
