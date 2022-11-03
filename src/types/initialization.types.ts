import type { Ref } from "vue";
import type { User } from "./general.types";

export class InitializationState {
  isLoad: boolean;
  decodeToken: DecodeTokenDto | null;
  accountData: AccountDataDto | null;
  token: string | null;
  lang: string | null;
  amoAccountId: number | null;
  amoUserId: number | null;
  users: User[];
  tokenError: string | null;
  DNAInfo: DNAInfoDto | null;
  currActiveTab: any;
}

export class DecodeTokenDto {
  account_id: number;
  user_id: number;
  iat: number;
  is_gnzs_admin_panel?: boolean;
}

export class AccountDataDto {
  amoAccountName: string;
  amoCurrency: string;
  amoCurrencySymbol: string;
  amoCustomFields: AmoCustomFieldsDto;
  amoLanguage: string;
  amoObjectAmocrm: AmoObjectAmocrmDto | null;
  amoPaidFrom: string;
  amoPaidTill: string;
  amoPipelines: object;
  amoSubdomain: string;
  amoTariff: string;
  amoTaskTypes: object;
  amoTechnicalAccount: number;
  amoTimezone: string;
  amoTimezoneOffset: string;
  amoTopLevelDomain: string;
  amoUserGroups: AmoUserGroupsDto;
  amoUsers: AmoUsersDto[];
  amoUsersCnt: number;
  amojoId: string;
  checkLicenseDate: string;
  createdAt: string;
  crmSupportDue: string;
  gnzsAmoCompanyId: number;
  id: number;
  isPartner: number;
  isPartnersClient: number;
  partner: PartnerDto;
  partnerAmoAccount: number | null;
  payType: string;
  timestamp: string;
  users: UsersDto[];
}

export class AmoCustomFieldsDto {
  catalogs: object;
  companies: object;
  contacts: object;
  customers: object;
  leads: object;
}

export class AmoObjectAmocrmDto {
  amo_messenger: object;
  amojo_enabled: boolean;
  amojo_id: string;
  amojo_rights: object;
  amojo_server: string;
  catalogs_available: boolean;
  country: string;
  currency: string;
  customers_enabled: boolean;
  date_format: string;
  date_pattern: string;
  helpbot_enabled: boolean;
  id: number;
  invoices: object;
  is_chats_inbox_available: boolean;
  is_chats_inbox_enabled: boolean;
  is_contact_name_display_order_first: boolean;
  is_need_proxy: boolean;
  is_retail_functions_enabled: boolean;
  is_rpa_available: boolean;
  language: string;
  name: string;
  notifications_enabled: boolean;
  nps_enabled: boolean;
  paid_from: number;
  paid_till: number;
  pay_type: string;
  products: object;
  stand: string;
  subdomain: string;
  suppliers: object;
  talks_auto_close_delay: number;
  tariffName: string;
  time_format: string;
  timezone: string;
  top_level_domain: string;
  unsorted_on: string;
  version: number;
  _hash: string;
  _users_avatars: UsersAvatartDto[];
  _users_count: number;
}

export class UsersAvatartDto {
  id: number;
  avatar: string;
}

export class AmoUserGroupsDto {
  [groupId: number]: {
    id: number,
    name: string,
  }
}

export class AmoUsersDto {
  group_id: number;
  id: number;
  is_admin: boolean;
  is_free: boolean;
  language: string;
  last_name: string;
  login: string;
  name: string;
  phone_number: string;
}

export class PartnerDto {
  chatLink: string | null;
  companyEmail: string | null;
  companyName: string | null;
  companyPhone: string | null;
  companySite: string | null;
  contactEmail: string | null;
  contactName: string | null;
  contactPhone: string | null;
  id: number;
  isActive: number;
}

export class UsersDto {
  amoAccountId: number;
  amoUserId: number
}

export class DNAInfoDto {
  id: number;
  isCrmSupportActive: boolean;
  crmSupportDue: string;
}

export class DataToChatra {
  name: string;
  email: string;
  phone: string;
  amoAccountId: number;
  amoSubdomain: string;
}