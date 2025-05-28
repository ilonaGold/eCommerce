export interface BaseAccessToken {
  access_token: string;
  expires_in: number;
  token_type: "Bearer";
  scope: string;
}

export interface AnonymousAccessToken extends BaseAccessToken {
  refresh_token: string;
}

export interface CustomerAccessToken extends BaseAccessToken {
  refresh_token: string;
}
