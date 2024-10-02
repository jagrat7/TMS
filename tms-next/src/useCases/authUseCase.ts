import {
  getUserByGoogleId,
  createGoogleUser,
    createUser,
    getUserByEmail,
} from "../repo/user"
import { EmailInUseError, LoginError, SessionError } from "./errors";
import { authService, GoogleUser } from "@/services/authentication/auth";

export async function registerUserUseCase(email: string, password: string) {
    const existingUser = await getUserByEmail(email);
    
    if (existingUser) {
      throw new EmailInUseError();
    }
    const passwordHash=await authService.hashPassword(password)
    const user = await createUser(email, passwordHash);
    // await createProfile(user.id, generateRandomName());
  
    // const token = await createVerifyEmailToken(user.id);
    // await sendEmail(
    //   email,
    //   `Verify your email for ${applicationName}`,
    //   <VerifyEmail token={token} />,
    // );
  
    return { id: user.id };
  }
  
export async function signInUseCase(email: string, password: string) {
    const user = await getUserByEmail(email);
    
    if (!user) {
      throw new LoginError();
    }
    // temp fix for types :(
    const isPasswordCorrect = await authService.verifyPassword(user.password_hash ?? '', password);

    if (!isPasswordCorrect) {
      throw new LoginError();
    }
  
    return { id: user.id };
  
  }
export async function signOutUseCase() {
  const { session } = await authService.validateRequest();
  if (!session) {
    throw new SessionError();

  }
  return await authService.invalidateSession(session); 

  
  }
  export async function createGoogleUserUseCase(googleUser: GoogleUser) {
    let existingUser = await getUserByEmail(googleUser.email);
  
    if (!existingUser) {
      existingUser = await createGoogleUser(googleUser.email, googleUser.sub);
    }
  
    // await createAccountViaGoogle(existingUser.id, googleUser.sub);
  
    // await createProfile(existingUser.id, googleUser.name, googleUser.picture);
  
    return existingUser.id;
  }
  export async function getAccountByGoogleIdUseCase(googleId: string) {
    return await getUserByGoogleId(googleId);
  

  }