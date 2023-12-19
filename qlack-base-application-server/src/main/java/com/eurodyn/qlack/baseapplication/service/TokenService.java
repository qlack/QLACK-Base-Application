package com.eurodyn.qlack.baseapplication.service;

import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.time.Instant;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class TokenService {

  // Maintain a map to store tokens
  private final Map<String, Date> tokenMap = new HashMap<>();

  /**
   * This method will retrieve the entire map of tokens without altering it
   */
  @Cacheable(value = "tokenCache", key = "'allTokens'")
  public Map<String, Date> getCachedTokens() {
    return Collections.unmodifiableMap(tokenMap);
  }

  /**
   * Update the cache with the modified map of tokens
   */
  @CachePut(value = "tokenCache", key = "'allTokens'")
  public Map<String, Date> updateTokens(Map<String, Date> newTokens) {
    tokenMap.clear();
    tokenMap.putAll(newTokens);
    return getCachedTokens();
  }

  /**
   * Add or update a token to the cache and return the updated map of tokens
   */
  @CachePut(value = "tokenCache", key = "'allTokens'")
  public Map<String, Date> updateToken(String key, Date date) {
    tokenMap.put(key, date);
    return getCachedTokens();
  }

  /**
   * Remove a token from the cache and return the updated map of tokens
   */
  @CachePut(value = "tokenCache", key = "'allTokens'")
  public Map<String, Date> removeToken(String key) {
    tokenMap.remove(key);
    return getCachedTokens();
  }

  /**
   * Clean cache For custom Csrf Cookies
   */
  @Scheduled(cron = "${customCookieFilter.cookie-cache-clean-timer}")
  public void cleanTokens() {
    var getAllTokens = getCachedTokens();
    if(!CollectionUtils.isEmpty(getAllTokens)) {
      for (Map.Entry<String, Date> entry : getAllTokens.entrySet()) {
        String key = entry.getKey();
        Date date = entry.getValue();
        if (date.before(new Date(Instant.now().toEpochMilli()))) {
          removeToken(key);
        }
      }
    }
  }

}
