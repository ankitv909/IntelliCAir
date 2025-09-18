/*interface for review jobs*/
export interface User {
    id: number;
    uid: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    password: string;
    gender: string | null;
    phoneNumber: string | null;
    role: string;
    createdAt: string;
    updatedAt: string;
    onboardingStatus: string | null;
    logo: string;
    businessInfo: string | null;
}

export interface Bid {
    id: number;
    userId: number;
    amount: number;
    status: string;
    approvedBy: number | null;
    createdAt: string;
    updatedAt: string;
    jobId: number;
    user: User;
}

export interface JobDetails {
    salaryUpperLimit?: number;
    salaryLowerLimit?: number;
    totalApplicants?: number;
    bidCount?: number;
    bidStartDate: string;
    bidEndDate: string;
    startDate: string;
    endDate: string;
    hourlyPay?: number;
}

export interface Job {
    id: number;
    uId: string;
    userId: number;
    jobType: 'PART_TIME' | 'FULL_TIME';
    speciality: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    isFeatured: boolean;
    isSponsored: boolean;
    Bid: Bid[];
    jobDetails: JobDetails;
    city: string;
    state: string;
    hospitalName: string;
}

export interface Pagination {
    page: number;
    perPage: number;
    totalPages: number;
    totalCount: number;
}

export interface JobsReviewResponse {
    message: string;
    result: {
        jobs: Job[];
        pagination: Pagination;
    };
    statusCode: number;
}
