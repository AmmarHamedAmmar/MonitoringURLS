import { Checks, Reports, URLsTags, User, Uservarification } from "../../types";
import { datastore } from "../datastoreInterface";
import { Database, open as sqliteOpen } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import { check } from "prettier";


export class models implements datastore {


    private db! : Database<sqlite3.Database, sqlite3.Statement> ;

    public async openDb () {
        // syntax only available for v. ^4.0.23
        this.db = await sqliteOpen({
        
            filename: path.join(__dirname, 'datafile.sqlite'),
            driver: sqlite3.Database, 
          });
          this.db.run('PRAGMA foreign_keys = ON;');
          await this.db.migrate({
              migrationsPath : path.join(__dirname, 'migrations')
          })
          console.log("this is the db " , this.db)
   

        return this ; 
    }


    async createCheck(check: Checks): Promise<void> {
        await this.db.run(
            'INSERT INTO users (id, url , interval , name , protocol , path , port , timeout , webhook , threshold , httpHeader , statusCode , ignoreSSL) VALUES (?,?, ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)',
            check.id , 
            check.url,
            check.interval , 
            check.name , 
            check.protocol , 
            check.path , 
            check.port ,
            check.timeout ,  
            check.webhook , 
            check.threshold , 
            check.httpHeader , 
            check.statusCode , 
            check.ignoreSSL , 
          );
    }
    async createCheckAuth(id : string,username : string , password:string , url :string) : Promise<void> {
        await this.db.run(
            'INSERT INTO ChecksAuth (id, username, password , url) VALUES (?,?,? , ?)',
            id,
            username,
            password , 
            url
          );
    }
    getAllChecks(): Promise<Checks[] | undefined> {
        return this.db.get(`SELECT * FROM Checks`); 

    }
    getCheckByURL(url: string): Promise<Checks[]| undefined > {
        return this.db.get(`SELECT * FROM Checks WHERE url = ?` , url ); 
    }
    getURLsByTag(tag : string ) : Promise<Checks[]| undefined >  { 
        return this.db.get(`SELECT * FROM URLsTags WHERE URLTage = ?` , tag ); 
    }
    deletePath(url: string, path: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteCheck(url: string): Promise<void> {
        return this.db.get(`DELETE * FROM Checks WHERE url = ?` , url ); 

    }
    getReports(): Promise<Reports[]>  {

        return this.db.all('SELECT * FROM Reports') ;
    }

    getReportByURL(url: string): Promise<Reports[] | undefined > {
        return this.db.get(`SELECT * FROM Reports WHERE url = ?` , url ); 
    }

    async createUser(user: User): Promise<void> {
        await this.db.run(
            'INSERT INTO users (id, email, password, firstName, lastName, userName) VALUES (?,?,?,?,?,?)',
            user.id,
            user.email,
            user.password,
            user.firstName,
            user.lastName,
            user.userName
          );
        
    }
    getUserByEmail(email: string): Promise <User | undefined>{
        return this.db.get<User>(`SELECT * FROM users WHERE email = ?`, email); 
        
    }
    getUserByUsername(userName: string): Promise<User | undefined >  {
        return this.db.get<User>(`SELECT * FROM users WHERE userName = ?`, userName); 
    }
    getUser(username : string , password : string) : Promise<User | undefined> { 
        return this.db.get<User>(`SELECT * FROM users WHERE userName = ? AND  password = ?`,username ,  password); 
    }

    async creaeteTag(URLTag : URLsTags): Promise<void> {
        await this.db.run(
            'INSERT INTO URLsTags (id, urlid, urltag) VALUES (?,?,?)',
            URLTag.id , 
            URLTag.url , 
            URLTag.urltag
          );
    }

    getUserVarification(userId: string) : Promise<Uservarification | undefined> {
        return this.db.get<Uservarification>(`SELECT * FROM UserVarificatoin WHERE userId = ?`,userId); 
    }

    async varifyUser(user : Uservarification) : Promise<void> {
        await this.db.run(
            'INSERT INTO UserVarificatoin (id,userId, varified) VALUES (?,?,?)',
            user.id,
            user.userId,
            user.varified,
          );
    }

    getUserById(userId: string) : Promise<User | undefined> {
        return this.db.get<User>(`SELECT * FROM users WHERE userId = ?`,userId);

    }

}

