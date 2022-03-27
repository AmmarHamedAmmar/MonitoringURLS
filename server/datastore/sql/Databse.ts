import { Checks, Reports, User, Uservarification } from "../../types";
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


    createCheck(check: Checks): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getAllChecks(): Promise<Checks[]> {
        throw new Error("Method not implemented.");

    }
    getCheckByURL(url: string): Promise<Checks[]> {
        console.log("url is the following  : " , url)
        throw new Error("Method not implemented.");
    }
    deletePath(url: string, path: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteCheck(url: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getReports(): Promise<Reports[]>  {

        return this.db.all('SELECT * FROM reports') ;
    }
    getReportsByTag(tag: string): Promise<Reports[]> {
        throw new Error("Method not implemented.");
    }
    getReportByURL(url: string): Promise<Reports[]> {
        throw new Error("Method not implemented.");
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

    creaeteTag(tag: string, url: string): Promise<void> {
        return Promise.resolve()
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

