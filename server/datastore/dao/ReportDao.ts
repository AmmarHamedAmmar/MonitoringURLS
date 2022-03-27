import { Reports } from "../../types";



export interface ReportDao {

    getReports() : Promise<Reports[]>
    getReportByURL (url : string ) : Promise <Reports[] | undefined>
}