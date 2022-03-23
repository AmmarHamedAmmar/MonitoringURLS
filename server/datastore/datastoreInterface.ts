
import {CheckDao, TagDao} from './ChecksDao'
import { models } from './sql';
import { ReportDao } from './ReportDao';
import { UserDao } from './UserDao';


export interface datastore extends CheckDao , ReportDao , UserDao , TagDao  {


}

export const db  = new models()


