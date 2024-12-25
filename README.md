# Spring Boot Project Development Guide (Temp Readme for Development)

## Table of Contents
- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Quick Module Creation](#quick-module-creation)
- [Understanding Each Layer](#understanding-each-layer)
  - [Controller Layer](#controller-layer)
  - [Service Layer](#service-layer)
  - [Repository Layer](#repository-layer)
  - [Model Layer](#model-layer)
- [Coding Standards](#coding-standards)
  - [Branch Naming Convention](#branch-naming-convention)
  - [Using Lombok](#using-lombok)
  - [Logging Practice](#logging-practice)
  - [Database Management](#database-management)
  - [API Documentation](#api-documentation)
  - [Configuration Setup](#configuration-setup)
- [Development Best Practices](#development-best-practices)
- [Quick Tips](#quick-tips)
- [Getting Started](#getting-started)
## Introduction
Hi Team LEXi!
This guide explains our Spring Boot project's organization and development practices. We've structured it to be easy to follow,  Keep it handy as you work - it's designed to be a quick reference for common tasks and standards.

## Project Structure
Our codebase follows a modular architecture where each feature or service has its own dedicated space. 
Each feature in our application gets its own dedicated module with this structure:..


```
com.lexi
├── module_name      # Each feature gets its own space
│   ├── controller   # Handles incoming requests
│   ├── service      # Contains business logic
│   ├── repository   # Manages database operations
│   ├── model        # Defines data structure
│   ├── dto          # Handles data transfer
│   └── exception    # Manages error handling
└── Application.java
```
Think of it like organizing a library where each book (feature) has its own shelf (module), and within each shelf, everything is neatly categorized.

## Quick Module Creation
Create a new module structure instantly. Just run this command:
```bash
mvn generate-sources -DmoduleName=your_module_name
```

## Understanding Each Layer

### Controller Layer
This layer handles the API Endpoints
Think of controllers as receptionists for your application. They:
- Receive incoming requests from users or other systems
- Direct these requests to the right department (service)
- Send back appropriate responses

### Service Layer
Services are like department managers. They:
- Make business decisions
- Coordinate work between different parts of the system
- Process and validate information
- Ensure business rules are followed

### Repository Layer
Repositories are like filing clerks. They:
- Store and retrieve data from the database
- Handle all database operations
- Keep data organized and accessible

### Model Layer 
Models are like blueprints for your data. They define what information you store and how it's structured. Here's how we set them up:

> Make sure you extends the model from `BaseEntity` if you need create and update time stamp to the data

```java
@Entity                     // Tells Spring this is a database table
@Table(name = "users")      // Specifies the table name in database
public class User {
    @Id                     // Marks this as the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-generates IDs
    private Long id;
}
```

The database is connected in this layer , make sure you mention the table name reference `@Table(name = "users")` 
mark nullable or uniqe constrains using `@Column(nullable = false, unique = true)`
mark ID field using `@Id`



---
# Coding Standards

## Branch Naming Convention
When creating a new branch, follow this pattern:
```
type/location/name

Types:
- feature    (new additions)
- bug        (fixing issues)
- improvement (enhancing existing features)

Location:
- client     (frontend changes)
- server     (backend changes)

Example:
feature/server/user-authentication
bug/client/login-form
improvement/server/error-handling
```
## Using Lombok
We use Lombok to reduce boilerplate code. Add these annotations to your classes:
```
@Getter                 // Generates all getters
```
```
@Setter                 // Generates all setters
```
```
@NoArgsConstructor      // Generates empty constructor
```
```
@AllArgsConstructor     // Generates constructor with all fields
```
```
@Builder                // Enables builder pattern
```
```
@Data                   // Generates getters, setters, toString, equals, hashCode
```
```
@Slf4j                  // Creates logger instance named 'log'
```
```
@Transactional
```
```
@Cacheable
```

## Logging Practice
We use TinyLog for keeping track of what's happening in our application.

```java
@Slf4j  // Lombok creates the logger for you
public class UserService {
}

// Use these for different situations:
log.info("User logged in successfully");      // Regular updates
log.warn("Invalid login attempt");            // Potential issues
log.error("Database connection failed");      // Serious problems
log.debug("Processing payment data");         // Development details
```


## API Documentation
Document all APIs in Postman:
1. Create a new collection for your module
2. Use folders to organize related endpoints
3. Add environment variables for different settings (development, testing, production)

## Configuration Setup
Your `application.properties` in `src\main\resources\` file needs these settings:

```properties
spring.application.name=springapp 

# Database URL, username, and password
spring.datasource.url=jdbc:mysql://localhost:3306/lexi
spring.datasource.username=user
spring.datasource.password=password

# Driver class (this is auto-detected if the dependency is added)
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA (if you're using Spring Data JPA)
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true


# JWT Config
jwt.secret=
jwt.expirationMs=3600000
jwt.refreshExpirationMs=86400000    

# Google OAuth2 Config
google.oauth.clientId=YOUR_GOOGLE_CLIENT_ID
google.oauth.clientSecret=YOUR_GOOGLE_CLIENT_SECRET
google.oauth.redirectUri=http://localhost:8080/api/oauth/google/callback
google.oauth.tokenUri=https://oauth2.googleapis.com/token
google.oauth.userInfoUri=https://openidconnect.googleapis.com/v1/userinfo

# Log Tomcat logs with TinyLog
logging.level.org.apache.catalina.core=debug
logging.level.org.apache.catalina.connector=debug
logging.level.org.springframework.cache=DEBUG


# Enable Tomcat access logs
server.tomcat.accesslog.enabled=true
server.tomcat.accesslog.pattern=%h %l %u %t "%r" %s %b
server.tomcat.accesslog.directory=logs

# Cache settings
spring.cache.type=redis
spring.data.redis.host=localhost
spring.data.redis.port=6379
spring.cache.redis.time-to-live=3600000



```

## Development Best Practices

1. **Code Organization**
   - Keep each feature in its own module
   - Write clear, focused code that does one thing well
   - Use meaningful names for classes and methods

## Quick Tips

1. **Organize Code**
   - Keep each feature in its own module
   - Write clear, focused code that does one thing well
   - Use meaningful names for classes and methods
2. Use Lombok's @Slf4j instead of creating loggers manually or using `System.out`
3. Always create DTOs for request/response data
4. Keep controllers thin, put business logic in services
5. Document API changes in Postman immediately


## Getting Started

1. Set up your development environment:
   - Install Java 17
   - Set up MySQL
   - Install Maven

2. Project setup:
   - Clone the repository
   - Configure your application.properties
   - Run `mvn clean install`

3. Start developing:
   - Create your branch
   - Generate module structure if needed
   - Write code following our standards
   - Document in Postman
   - Test thoroughly
   - Create PR with clear description

Remember: Keep this guide open while coding - it's here to help you!
