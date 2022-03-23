import { Reports } from "../types";



export interface ReportDao {

    getReports() : Reports[]
    getReportsByTag(tag : string) : Reports[] | undefined 
    getReportByURL (url : string ) : Reports[] | undefined
}