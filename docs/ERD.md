
# ERD Monitoring ULRS : 

This document explores the design of Monitoring ULRS, a social experience for tracking URLs.

We'll use a basic client/server architecture, where a single server is deployed on a cloud provider next to a relational database, and serving HTTP traffic from a public endpoint.

# Storage : 
We'll use a relational database (schema follows) to fast retrieval of the URL reports . A minimal database implementation such as sqlite3 suffices, although we can potentially switch to something with a little more power such as PostgreSql if necessary. Data will be stored on the server on a separate, backed up volume for resilience. There will be no replication or sharding of data at this early stage.

# Schema : 
We'll need at least the following entities to implement the service:

**Users** 
| Column | Type |
|--------|------|
| ID     | STRING /UUID |
| First/Last Name | STRING |
| Passwords | STRING | 
|E-mail | STRING |
|UserName | STRING |   


**URLs** 
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

**CheckTime** 
|Column | Type  |
|-------|-------|
| URLID | STRING/ UUID | 
| CheckTime | NUMBER | 

### note  : 
    this table has one to one relationship with URLs table 

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
    this table has one to many relationship with URLs table 


**UserURLs** 

|Column | Type | 
|-------|------|
| UserID | STRING/ UUID | 
| URLID | STRING/UUID | 

### note : 
    this table has one to many relationship with Users table ,
    and one to one relationship with URLs table 


**URLsTags** 
|COlumn | Type | 
|-------|------|
| URLID | STRING/UUID | 
| URLTage | STRING | 

### note : 
    this table has one to many relationship with URLs table 





