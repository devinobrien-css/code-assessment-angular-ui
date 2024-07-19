export interface CurrentUserInfoResponse {
  id: string;
  email: string;
  roles: string[];
  first: string;
  last: string;
  profileAvatar: ProfileAvatar;
}

export interface ProfileAvatar {
  id: string;
  url: string;
}
