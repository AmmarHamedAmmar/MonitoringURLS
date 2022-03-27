import jwt from 'jsonwebtoken';

import { JwtObject, User } from './types';

// deliver the secret in a secure way 
export function signJwt(obj: JwtObject): string {
  return jwt.sign(obj, getJwtSecret(), {
    expiresIn: '15d',
  });
}

// Throws on bad tokens
export function verifyJwt(token: string): JwtObject {
    
  return jwt.verify(token, getJwtSecret()) as JwtObject;
}

export function decodeJWT(token : string){
    return jwt.verify(token, getJwtSecret() , function(err , decode){
            if(err) {
                console.log("something went wrong in decoding the jwt ")
                return ;
            }
            else {
                // UNCHECKED
                const user_id  = decode
                console.log(user_id)
                return user_id
            }
    }) ;

}
function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('Missing JWT secret');
    process.exit(1);
  }

  return secret;
}