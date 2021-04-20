package com.eurodyn.qlack.baseapplication.config;

public class AppConstants {

  public static class Audit {

    public static class Event {

      public static final String AUTHENTICATION = "Authentication";
    }

    public static class Level {

      public static final String SECURITY = "Security";
    }
  }

  public static class Jwt {

    // The unique JWT id.
    public static final String CLAIM_EMAIL = "email";
  }
}
