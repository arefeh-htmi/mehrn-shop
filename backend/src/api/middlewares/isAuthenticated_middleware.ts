import jwt from 'express-jwt';
import { config } from '@src/config';

/**
 * Assuming that the JWT will come in a header
 *
 * Authorization: Bearer ${JWT}
 */
const getTokenFromHeader = req => {
  /**
   * @TODO Edge and Internet Explorer do some weird things with the headers
   * So I believe that this should handle more 'edge' cases ;)
   */
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

export const isAuthenticated = jwt({
  secret: config.jwt.jwtSecret, // The _secret_ to sign the JWTs
  algorithms: config.jwt.jwtAlgorithms, // JWT Algorithm
  userProperty: 'token', // Use req.token to store the JWT
  getToken: getTokenFromHeader, // How to extract the JWT from the request
});
