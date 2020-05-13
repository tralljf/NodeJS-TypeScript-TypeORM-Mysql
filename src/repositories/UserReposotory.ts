import User from '../models/User'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(User)
class UserReposotory extends Repository<User> {

}

export default UserReposotory;
