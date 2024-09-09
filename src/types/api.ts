export interface UserData {
  id: string;
  email: string;
}

export interface UserResponse extends UserData {
  access_token: string;
  refresh_token: string;
}

export interface Favorite {
  id: number;
  itemId: number;
}
