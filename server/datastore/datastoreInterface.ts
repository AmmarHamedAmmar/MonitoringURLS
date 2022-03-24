
import {CheckDao, TagDao} from './dao/ChecksDao'
import { models } from './sql';
import { ReportDao } from './dao/ReportDao';
import { UserDao } from './dao/UserDao';


export interface datastore extends CheckDao , ReportDao , UserDao , TagDao  {


}

export const db  = new models()


