
# ERD Monitoring ULRS : 

This document explores the design of Monitoring ULRS, a social experience for tracking URLs.

We'll use a basic client/server architecture, where a single server is deployed on a cloud provider next to a relational database, and serving HTTP traffic from a public endpoint.

# Storage : 
We'll use a relational database (schema follows) to fast retrieval of the URL reports . A minimal database implementation such as sqlite3 suffices, although we can potentially switch to something with a little more power such as PostgreSql if necessary. Data will be stored on the server on a separate, backed up volume for resilience. There will be no replication or sharding of data at this early stage. we will use a package containing 2 versions: sqlite3 which is DB driver and sqlite which gives some exxternal features like : DB migrations 

# Schema : 
We'll need at least the following entities to implement the service:

**Users** 
| Column | Type |
|--------|------|
| ID     | STRING /UUID |
| First/Last Name | STRING |
| Passwords | STRING | 
| E-mail | STRING |
| UserName | STRING |   

**UserVarificatoin**
| Column | Type |
|--------|------|
| ID     | STRING /UUID |
| userId | STRING/UUID | 
| varified | BOOLEAN | 
| varifiedAt | Timestamps | 


**Checks** 
| Column | Type | 
|--------|------|
| ID     | STRING/ UUID | 
| URL    | STRING |
| name    | STRING |
| protocol    | STRING |
| path    | STRING |
| port    | NUMBER |
| webhook    | STRING |
| timeout     | NUMBER |
| interval     | NUMBER |
|threshold | NUMBER | 
|httpHeaders | STRING |
|statusCode | NUMBER |
|ignoreSSL| STRING |


**ChecksAuthentication**
| Column | Type | 
|--------|------|
|username | STRING | 
|password | STRING |
|url | STRING |  
### note : 
    this table has one to one relationship with Checks table (Every URL may have one auth values)


**Path** 
|Column | Type | 
|-------|------|
| ID     | STRING/ UUID | 
| Path   | STRING/ UUID |
| URLID  | STRING/ UUID |

### note : 
    this table has one to many relationship with Checks table (Every URL may have differtent pathes)

**Reports** 
| Column | Type  | 
|--------|-------|
| ID     | STRING /UUID |
| URL     | STRING /UUID |
| Status | NUMBER |
| Availability | NUMBER | 
| Outages | NUMBER | 
| DownTime | NUMBER | 
| UpTime  | NUMEBR | 
| ResposeTime | NUMBER | 


**RequestsLogs** 

|Column | Type | 
|-------|------|
| ID     | STRING/ UUID | 
| URLId | STRING/UUID | 
| RequestType | STRING | 
| Status | STRING | 
| History  | Timestamp | 

### note 1 : 
    every time the status code changes for specific URL we store this logs here by date 

### note 2 : 
    this table has one to many relationship with Checks table (every URL may have success log and failure logs )


**UserURLs** 

|Column | Type | 
|-------|------|
| UserID | STRING/ UUID | 
| URLID | STRING/UUID | 

### note : 
    this table has one to many relationship with Users table (every user may have more than one URL to check on ) ,
    and one to one relationship with Checks table (every URL should be listed in one user bucket )


**URLsTags** 
|COlumn | Type | 
|-------|------|
| URLID | STRING/UUID | 
| URLTage | STRING | 

### note : 
    this table has one to many relationship with Checks table (every Tag may have different URLs listed beyond ) 

# Server : 
A simple HTTP server is responsible for authentication, serving stored data, and potentially ingesting and serving analytics data.

- Node.js is selected for implementing the server . 
- Express.js is the web server framework.

# Auth : 
for v1 , a simple JWT-based auth mechanism is to be used , with passwords encrypted and stored in the database. OAuth is to be added initially or later for Google + Facebook . 

# API : 

 **Auth** :
 ``` 
/v1/signIn              [POST] 
/v1/signUp              [POST]
/v1/signUpVarification  [POST]
```

**reports** 
```
/v1/reports/list           [GET]
/v1reports/ :tag           [GET] 
/v1reports/ :url           [GET]
```
**Tags** 
```
/v1/tag/:url/               [POST]

```
**checks** 
```
/v1/checks                  [GET]
/v1/check/:url              [DELETE]
```

