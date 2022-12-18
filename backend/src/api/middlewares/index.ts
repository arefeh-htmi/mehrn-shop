import { attachCurrentUser } from './attachCurrentUser_middleware';
import { isAuthenticated } from './isAuthenticated_middleware';
import { isAutherized } from './isAutherized_middleware';

export default {
  attachCurrentUser,
  isAuthenticated,
  isAutherized,
};
