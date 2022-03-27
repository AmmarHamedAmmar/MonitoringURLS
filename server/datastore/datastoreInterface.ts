
import {CheckDao, TagDao} from './dao/ChecksDao'
import { models } from './sql/Databse';
import { ReportDao } from './dao/ReportDao';
import { UserDao } from './dao/UserDao';


export interface datastore extends CheckDao , ReportDao , UserDao , TagDao  {
  
} 


export  let db : datastore ; 
export  const  initDB  = async ()=> {
    db = await new models().openDb()
}


