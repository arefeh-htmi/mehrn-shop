import { UserRoles } from '@src/types/UserRole';

/**
    Gets a set of autherized roles and checks if user if autherized
*/

export const isAutherized =
  ({ ...roles }: UserRoles[]) =>
  (req, res, next) => {
    if (!req.user) {
      return res.status(401).send('Unauthorized');
    }

    const hasRole = roles.find(role => req.user.role === role);
    if (!hasRole) {
      return res.status(403).send('You are not allowed to make this request.');
    }

    return next();
  };
