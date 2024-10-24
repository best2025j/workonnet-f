import { LOGGED_IN_USER } from '../utils/common';

export interface ICountryData {
  name: string;
  shortCode: string;
}

export interface IPhoneNumberField {
  code: string;
  number: string;
  country: ICountryData;
}

export interface IMediaFile {
  name: string;
  url: string;
  size: number;
  mimetype: string;
  metadata?: Map<string, string>;
}

export interface IJobApplicationStats {
  recentJobs?: IJobApplications[];
  totalJobsApplied: number;
  totalInterview: number;
  totalInReview: number;
  totalRejected: number;
  totalAccepted: number;
  offeredJobs?: IJobApplications[];
}

export interface ISocialLinks {
  facebookUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  portfolioUrl?: string;
}

export interface ISalaryExpectation {
  amount: string;
  frequency?: string;
  currency?: string;
}

export interface IPhysicalLocation {
  city: string;
  country: string;
}

export interface IResumeResource {
  resumeCv?: IMediaFile;
  coverLetter?: IMediaFile;
}

export interface IUserDetails {
  [x: string]: any;
  username: string;
  status: 'active' | 'draft' | 'blocked';
  phoneNumber: IPhoneNumberField;
  email?: string;
  photo?: IMediaFile;
  photoHeader?: IMediaFile;
  id: string;
  firstName: string;
  lastName: string;
  occupation: string;
  location: string;
  resumeResource?: IResumeResource;
  salary?: ISalaryExpectation;
  bio: string;
  socialLinks: ISocialLinks;
  skills?: string[];
  spokenLanguages?: string[];
}

export interface IRecruiterDetails {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: IPhoneNumberField;
  phoneNumberVerified?: boolean;
  status: 'active' | 'draft' | 'blocked';
  photo?: IMediaFile;
  photoHeader?: IMediaFile;
  companyName: string;
  companySize: string;
  industry: string;
  websiteUrl: string;
  bio?: string;
  username: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISettingsDetails {
  id: string;
  recruiter?: IRecruiterDetails | string;
  user?: IUserDetails | string;
  twoFa: boolean;
  newsAndUpdates: boolean;
  tipsAndTutorials: boolean;
  reminders: boolean;
}

export interface IAuthCodeResponseData {
  accessToken: string;
  accountType: string;
  completedOnboarding: boolean;
  userId: string;
}

export interface IJobPost {
  recruiter: IRecruiterDetails | string;
  title: string;
  slug: string;
  description: string;
  requirements: string[];
  benefits: string[];
  location: 'remote' | 'onsite' | 'hybrid';
  level: 'entry' | 'mid' | 'mid-senior' | 'senior';
  jobType: string;
  externalUrl?: string;
  skills: string[];
  expectedSalary: number;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  applicants: number;
  id: string;
}

export interface IPagination {
  hasNextPage: false;
  hasPrevPage: false;
  limit: number;
  nextPage: number;
  page: number;
  pagingCounter: number;
  prevPage: number;
  totalDocs: number;
  totalPages: number;
}

export interface IJobPostWithPagination extends IPagination {
  docs: IJobPost[];
}

export interface IRecruitersWithPagination extends IPagination {
  docs: IRecruiterDetails[];
}

export interface IWorkExperience {
  id: string;
  user?: IUserDetails | string;
  companyOrganization: string;
  website?: string;
  companyLocation: string;
  jobTitle: string;
  startingFrom: string;
  endingIn: string;
  presentlyWorking?: boolean;
  details: string;
}

export interface IJobApplicationsWithPagination extends IPagination {
  docs: IJobApplications[];
}

export interface IJobApplications {
  id: string;
  user?: IUserDetails | string;
  recruiter?: Partial<IRecruiterDetails>;
  status: JOB_APPLICATION_STATUS;
  rejectionNotice?: string;
  jobListing: Partial<IJobPost>;
  createdAt: string;
  updatedAt: string;
  interviewNotice?: string;
  acceptanceMessage?: string;
}

export interface IUserSubscription {
  id: string;
  user?: IUserDetails | string;
  recruiter?: Partial<IRecruiterDetails> | string;
  platform: string;
  packageType: IPricing;
  platformId?: string;
  paymentMethod?: string;
  lastDigits?: string;
  status?: string;
  subType: string;
}

export interface IPricing {
  id: string;
  packageName: string;
  frequencyType: string;
  status: string;
  description: string;
  benefits: string[];
  price: number;
  forUserType: string;
  subPlatformId?: string;
  currency?: string;
}

export interface IEducationBackground {
  id: string;
  user?: IUserDetails | string;
  schoolName: string;
  fieldOfStudy: string;
  degree: {
    slug: string;
    text: string;
  };
  startingYear: string;
  endingYear: string;
}

export interface TelInputData {
  country: { name: string; iso2: string; dialCode: string };
  countryCallingCode: string;
  countryCode: string;
  formatted: string;
  nationalNumber: string;
  number: string;
  valid: boolean;
}

export interface IJobStatsData {
  jobsLength: number;
  recentJobs?: IJobPost[];
}

export interface IUserAuthData {
  accountType: string;
  userId?: string;
  adminId?: string;
  recruiterId?: string;
}

export interface ITimer {
  expired: boolean;
  days?: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
  fullTimer?: string;
}

export type ApiDataResponse = {
  response: Record<string, any>;
};

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export interface ApiErrorResponse {
  message: string;
  stack: string;
  statusCode: number;
  data: {
    message: string;
    status: string;
    errorCode?: string;
  };
}

export interface ApiSuccessResponse {
  status: number;
  data: any;
}

export enum JOB_APPLICATION_STATUS {
  IN_REVIEW = 'In Review',
  PENDING = 'Pending',
  INTERVIEW = 'Interview',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
}
