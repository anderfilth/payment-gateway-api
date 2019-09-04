import UserRepository from '../repositories/UserRepository';
import Exception from '../../../helpers/errors/Exception';
import errorDefinitions from '../../../helpers/errors/errorDefinitions';
import logger from '../../../helpers/logger';

class UserBo {
  constructor(params) {
    this.params = params;
    this.userRepository = new UserRepository();
  }

  async store() {
    logger.debug('UserBo.store');
    const data = this.params.body.value;
    await this.storeValidation(data);
    const dataStore = await this.userRepository.store(data);
    const { id } = dataStore;
    return {
      id,
    };
  }

  async update() {
    logger.debug('UserBo.update');
    const data = this.params.body.value;
    const id = this.params.userId.value;
    await this.updateValidation(data);
    await this.userRepository.update({ data, id });
  }

  async storeValidation(data) {
    logger.debug('UserBo.storeValidation');
    const userExist = await this.userRepository.findUser({ email: data.email });
    if (userExist) {
      Exception.raise({
        ...errorDefinitions.BAD_REQUEST_PARAMETER,
        values: { '#INPUT': 'User already exist' },
      });
    }
  }

  async updateValidation(data) {
    logger.debug('UserBo.updateValidation');
    const id = this.params.userId.value;
    const user = await this.userRepository.findUser({ id });
    if (data.oldPassword && !(await user.checkPassword(data.oldPassword))) {
      Exception.raise({
        ...errorDefinitions.BAD_REQUEST_PARAMETER,
        values: { '#INPUT': 'Password does not match' },
      });
    }
  }
}

export default UserBo;
