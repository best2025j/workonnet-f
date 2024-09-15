import { LOGGED_USER } from '../utils/common';

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
  accountType: LOGGED_USER;
  phoneNumber: IPhoneNumberField;
  email?: string;
  photo?: IMediaFile;
  id: string;
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
  userId: string;
}

export interface ITimer {
  expired: boolean;
  days?: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
  fullTimer?: string;
}
