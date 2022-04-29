import { Job } from "./job.entity";



export class CandidateJob{
    id:number;
    fullname : string;
    dob : Date;
    address : string;
    education : string;
    resume : string;
    photo : string;
    gender : boolean;
    jobId  : number;
    accountId: number;
    phone: string;
    applyDate: Date;
    interviewDate: Date;
    job: Job
}