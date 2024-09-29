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

export interface IUserDetails {
  username: string;
  status: string;
  accountType: LOGGED_IN_USER;
  phoneNumber: IPhoneNumberField;
  email?: string;
  photo?: IMediaFile;
  id: string;
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
}

export interface IAuthCodeResponseData {
  accessToken: string;
  accountType: string;
  completedOnboarding: boolean;
  userId: string;
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
