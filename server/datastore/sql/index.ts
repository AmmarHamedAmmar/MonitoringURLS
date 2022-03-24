import { Checks, Reports, User } from "../../types";
import { datastore } from "../datastoreInterface";
import { Database, open as sqliteOpen } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';


export class models implements datastore {
    private db! : Database<sqlite3.Database, sqlite3.Statement> ;
  
    public async openDb () {
        // syntax only available for v. ^4.0.23
        const db = await sqliteOpen({
            filename: path.join(__dirname, 'datafile.sqlite'),
            driver: sqlite3.Database, 
          });

          await db.migrate({
              migrationsPath : path.join(__dirname, 'migrations')
          })
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

        throw new Error("Method not implemented.");
    }
    getReportsByTag(tag: string): Promise<Reports[]> {
        throw new Error("Method not implemented.");
    }
    getReportByURL(url: string): Promise<Reports[]> {
        throw new Error("Method not implemented.");
    }
    createUser(User: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(email: string, password: string): Promise <User> {
        throw new Error("Method not implemented.");
    }
    getUserByUsername(username: string, password: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    creaeteTag(tag: string, url: string): Promise<void> {
        return Promise.resolve()
    }

}

