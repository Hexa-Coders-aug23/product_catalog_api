import { User } from '../models';
import { IUser } from '../types/User';

const getAllActivated = () => {
  return User.findAll({
    where: {
      activationToken: '',
    },
  });
};

const normalize = ({ id, email }: Pick<IUser, 'id' | 'email'>) => {
  return { id, email };
};

const findByEmail = (email: string) => {
  return User.findOne({ where: { email } });
};

export const userService = {
  getAllActivated,
  normalize,
  findByEmail,
};
