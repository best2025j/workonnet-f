export enum TABS {
  APPLIED = 'applied',
  IN_REVIEW = 'in-review',
  INTERVIEW = 'interview',
  OFFERED = 'offered',
  REJECTED = 'rejected',
}

export enum JOB_OPENING_TABS {
  ACTIVE = 'active',
  IN_ACTIVE = 'inactive',
  DRAFT = 'draft',
}

export enum POST_JOBS_TABS {
  UNDER_REVIEW = 'under-review',
  ACTIVE = 'active',
  REMOVED = 'removed',
  DRAFTS = 'drafts',
}

export enum LOGGED_IN_USER {
  RECRUITER = 'recruiter',
  JOBSEEKER = 'jobseeker',
  ADMIN = 'admin',
  GUEST = 'guest',
}

export enum FORGOT_PASSWORD_USER_TYPE {
  RECRUITER = 'RECRUITER',
  JOBSEEKER = 'JOBSEEKER',
}

export const STORAGE_TOKEN_KEY: string = '_us-res';
export const STORAGE_LOGGED_IN_USER_KEY: string = '_us-da';
export const STORAGE_LOGGED_IN_USER_DETAILS_KEY: string = '_us-dsa';
export const STORAGE_AUTHENTICATED: string = '_us-aa';
export const STORAGE_CURRENT_USER_TYPE: string = '_us-ut';
export const STORAGE_USER_TOKEN: string = '_us-tke';
export const STORAGE_CURRENT_PHONE: string = '_us-p';
export const STORAGE_USER_PUBLIC_TOKEN: string = '_usc';

// CONSTANTS
export const PASSPHRASE = 'asdja3932sd';

export enum ERROR_CODE {
  FIELD_INVALID = '100001',
  FIELD_REQUIRED = '110000',
  FIELD_NOT_NUMBER = '111000',
  FIELD_NOT_BOOLEAN = 'B10001',
  FIELD_NOT_ARRAY = 'A10111',
  FIELD_LENGTH = '000000',
  FIELD_MIN = 'M10101',
  FIELD_MIN_LENGTH = 'MI1101',
  FIELD_MAX = 'MA0011',
  FIELD_MAX_LENGTH = 'MA1101',
  FIELD_DO_NOT_EXIST = '111111',
  FIELD_HAS_DUPLICATES = '101010',
  FIELD_NOT_ALLOWED = '00000F',
  FIELD_EXISTS = 'E00001',
  FIELD_EXPIRED = 'EE0000',

  INVALID_URL = 'UL0100',

  RESOURCE_DO_NOT_EXIST = 'EEEEEE',

  CREDENTIALS_INCORRECT = 'CI0001',
  CREDENTIALS_MISSING = 'CM0001',
  INVALID_TOKEN = 'TF0001',
  INVALID_TOKEN_PAYLOAD = 'PTF011',
  PERMISSION_DENIED = 'P11111',

  PHOTO_NAME_GENERATION_FAILED = 'PHG011',
  PHOTO_CATEGORY_ID_EXISTS = 'PHC010',

  //
  SERVER_ERROR = 'SER100',
  POST_CODE_INVALID = 'POS299',
  POST_CODE_SERVER_ERROR = 'POS400',

  //
  WEBHOOK_FAILED = 'WEHSEC1',
}

// migrate to env.
export const BACKEND_URL = 'http:127.0.0.1:5400/api/v1/';
