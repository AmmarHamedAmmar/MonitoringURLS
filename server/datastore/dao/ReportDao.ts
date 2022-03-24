import { Reports } from "../../types";



export interface ReportDao {

    getReports() : Promise<Reports[]>
    getReportsByTag(tag : string) : Promise <Reports[] | undefined >  
    getReportByURL (url : string ) : Promise <Reports[] | undefined>
}