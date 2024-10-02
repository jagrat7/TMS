import { UserId  } from "../../repo/types";

export interface IAuthService {
    validateRequest(): Promise<{ user: User; session: Session } | { user: null; session: null } >
    getCurrentUser(): Promise<User | undefined>
    // getSession(): Promise<Session | null>
    setSession(userId: string): Promise<void>
    hashPassword(password:string):Promise<string>
    verifyPassword(userPassword:string,password:string):Promise<boolean>
    invalidateSession(sessionId: Session): Promise<boolean>
    
}



// User type
type User = {
  id: UserId;
  // Other attributes from DatabaseUserAttributes if any
};

// Session type
type Session = {
  id: string;
  expiresAt: Date;
  fresh: boolean;
  userId: UserId;
};
