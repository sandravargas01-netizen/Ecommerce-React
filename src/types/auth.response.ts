export interface AuthResponse {
  token: string;
  userId: number;
  email: string;
  role: "ADMIN" | "SELLER" | "BUYER"; 
  
}   