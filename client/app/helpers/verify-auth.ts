import jwt, { JwtPayload } from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";

const jwksUrl = `https://app.dynamic.xyz/api/v0/sdk/${process.env
  .DYNAMIC_ENV_ID!}/.well-known/jwks`;

const client = new JwksClient({
  jwksUri: jwksUrl,
  rateLimit: true,
  cache: true,
  cacheMaxEntries: 5, // Maximum number of cached keys
  cacheMaxAge: 600000, // Cache duration in milliseconds (10 minutes in this case))}
});

export const verifyAuth = async (encodedJwt: string) => {
  const signingKey = await client.getSigningKey();
  const publicKey = signingKey.getPublicKey();

  const decodedToken: JwtPayload = jwt.verify(encodedJwt, publicKey, {
    ignoreExpiration: false,
  }) as JwtPayload;

  if (decodedToken.scopes.includes("requiresAdditionalAuth")) {
    // Either reject or handle the scopes appropriately.
    // `requiresAdditionalAuth` is the scope used to indicate that JWT requires additional verification such as MFA.
    throw new Error("Additional verification required");
  }

  console.log(decodedToken); // { iss: 'xxxx', exp: nnnn, ... }
};
