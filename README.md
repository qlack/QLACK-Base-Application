# QLACK-Base-Application

The QLACK Base Application is a full-stack blueprint, featuring Angular and Spring Boot. You can
start your new project by cloning this repo and then built on top of it.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/qlack/QLACK-Base-Application)

## Features

### Login / Logout with JWT integration

![](doc/1.png)

### Theme support

![](doc/1a.gif)

### Dynamic collapsible sibebar, dynamic breadcrumb

![](doc/1b.png)
![](doc/1c.png)
![](doc/1d.png)

### Tables with sorting, pagination, and filtering with minimal code

![](doc/2.png)

### CRUD examples

![](doc/3.png)

### HTTP progress bars

![](doc/4.png)

### File upload / download

![](doc/5.png)

### Form back-end validation

![](doc/6.png)

### Annotation-based content filtering

![](doc/7b.png)

![](doc/7.png)

### Standardised popups

![](doc/8.png)

### Internationalisation

![](doc/9.gif)

## Containers support

Both the front-end and the back-end component come with a `Dockerfile` allowing you to build Docker
images.

The supplied build scripts provide two interesting features:

* The application is built within a Docker container, so no local Java or Angular/NodeJS environment
  is necessary. This allows anyone to clone your project and build Docker containers for it without
  any additional setup.

* Image building follows a multi-stage approach. Expensive operations (such as downloading Maven
  artifacts or NodeJS packages) take place in a previous phase of your build, allowing you to skip
  those phases in future builds (provided your dependencies remain the same).

A top-level Docker Compose file is also provided, allowing you to build and run the complete application
stack in just a single command:

`docker compose up`

The application becomes accessible on port 6565, i.e. http://localhost:6565.

## Development setup

To start the back-end component, install Java 21+ and Apache Maven 3.9.9+ and then issue:

`mvn spring-boot:run`

To start the front-end component, install Node.js and issue:

`npm install`

then

`npm start`

## Extra Security Feature CustomCookieFilter

The `CustomCookieFilter` is a filter designed to create a token and place it in a cookie, subsequently validating this
token with every request. Specifically, it involves JWT authentication. During the initial login process, a token is
generated and placed in a cookie. Each cookie has a timer associated with it, expiring either when the JWT expires or
becomes invalid after its first use for a single request. Upon each request, the previously generated token is
validated, and a new one is created, replacing the old token in a cookie. An exception to this process occurs during
logout, where this filter is skipped.

In the case of multiple requests, old cookies are kept alive for a short time, with a default of 60 seconds. This is
implemented to prevent conflicts when the server experiences a delay and is unable to send back a new cookie for the
next request. This duration is configurable through the `cookie-timer` property in the application file.

Furthermore, cookies are stored in a cache, and a scheduler is in place to clean this cache. The cleaning schedule can
be modified using the `cookie-cache-clean-timer` property, which uses a cron-like expression (`0 * * ? * *` in the
provided example).

To implement this functionality, the following line of code should be added to your `WebSecurity` class within the
`SecurityFilterChain`:

```java
.addFilterBefore(customCookieFilter, BasicAuthenticationFilter.class);
```

Additionally, the following properties should be added to your application file:

```yaml
customCookieFilter:
  cookie-name: COOKIE-TOKEN # the name of the cookie
  cookie-timer: 60 # per seconds, the timer for keeping old cookies alive for multiple requests
  cookie-cache-clean-timer: 0 * * ? * * # the scheduler where we clean cache from non-valid cookies
  login-path: '/**/users/auth'
  logout-path: '/**/users/logout'
```

Ensure these configurations are in place for the filter to function correctly.

## Angular unit tests

There are 25 Angular unit tests as examples to demonstrate testing for Components and Services. The unit tests are the
files with naming ending with .spec.ts. You can find the tests at folders "login", "logout", "employee".

### Karma unit tests report

The unit tests are using Jasmine and Karma. All the configurations to use Jasmine and Karma are located inside the
`karma.conf.js` file. Open a terminal in `qlack-base-application-ui` folder and run the unit tests by typing the 
command `npm run test`.

The report of unit tests will be as shown in the screenshot.
![](doc/10.png)

### Karma code coverage report

In the same terminal you can run the command "npm run karma_coverage" to get the code coverage.
The report of code coverage will be as shown in the screenshot.
![](doc/11.png)
The karma code coverage module will also create a code coverage report which you will find it in the path `coverage/qlack_base_application_ui`.
The html report of the code coverage will be as shown in the screenshot.
![](doc/12.png)

## Springboot Backend

There are 16 unit tests for the Backend. **Jacoco** plugin for code coverage is also included in the pom.xml.

## Contributing

We welcome contributions and appreciate your effort to help improve this project!  
To keep things organized please follow the steps below:

1. **Fork the repository** to your own GitHub account.

2.  **Clone** your fork to your local machine:

    ```bash
    git clone https://github.com/<your-username>/<repo>.git
    cd <repo>
    ```

3. **Make your changes** and **Commit** your work:

4. **Push** the branch to your fork.

5. **Open a Pull Request (PR)** against the main repository:  
   - A Pull Request (PR) is a GitHub feature that lets you propose changes from your fork back to the original repository.  
   - To create one:  
     1. Log in to your GitHub account.  
     2. Navigate to your forked repository.  
     3. Click the **"Contribute"** button (usually near the top of the repo page).  
     4. Select **"Open pull request"**.  
     5. Make sure the base repository is the original project and the base branch (`master`) is correct.  
     6. Confirm that the “compare” branch is the branch you pushed.  

6. In the PR form:
    - Provide a clear description of the changes and why they are needed  
    - Reference related issues if applicable
    - Request a review from maintainers
    - Be open to feedback and ready to make revisions 

You can also watch an overview of how to contribute to OSS via Pull Requests here: [GitHub Pull Request Tutorial](https://www.youtube.com/watch?v=dLRA1lffWBw)
