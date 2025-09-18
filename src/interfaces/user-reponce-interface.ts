interface Hospital {
    id: number;
    userId: number;
    name: string;
    city: string;
    state: string;
    address1: string;
    address2: string | null;
    zipcode: string;
    createdAt: string;
    updatedAt: string;
}

interface UserData {
    id: number;
    uid: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    gender: string | null;
    phoneNumber: string | null;
    "role":"CANDIDATE" | "HR" | "HOSPITAL";
    createdAt: string;
    updatedAt: string;
    onboardingStatus: string | null;
    logo: string | null;
    hospital: Hospital;
}
