import { Checks, Reports, User } from "../../types";
import { datastore } from "../datastoreInterface";


export class models implements datastore {

    
    createCheck(check: string): void {
        throw new Error("Method not implemented.");
    }
    getAllChecks(): Checks[] {
        return [];
    }
    getCheckByURL(url: string): Checks[] {
        console.log("url is the following  : " , url)
        return [] 
    }
    deletePath(url: string, path: string): void {
        throw new Error("Method not implemented.");
    }
    deleteCheck(url: string): void {
        throw new Error("Method not implemented.");
    }
    getReports(): Reports[]  {

       return [] ; 
    }
    getReportsByTag(tag: string): Reports[] {
        throw new Error("Method not implemented.");
    }
    getReportByURL(url: string): Reports[] {
        throw new Error("Method not implemented.");
    }
    createUser(User: User): void {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(email: string, password: string): User {
        throw new Error("Method not implemented.");
    }
    getUserByUsername(username: string, password: string): User {
        throw new Error("Method not implemented.");
    }
    creaeteTag(tag: string, url: string): void {
        throw new Error("Method not implemented.");
    }

}