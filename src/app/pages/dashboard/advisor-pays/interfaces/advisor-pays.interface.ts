export interface AdvisorPaysInterface {
    _id:               string;
    userId:            string;
    avatar:            string;
    fullName:          string;
    email:             string;
    bankName:          string;
    bankAccountType:   string;
    bankAccountNumber: string;
    bankCountry:       string;
    balance:           number;
    createdAt:         Date;
}