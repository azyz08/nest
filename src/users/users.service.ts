import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }


  async findOne(id: string) {
    try {
      const one = await this.userModel.findById(id);
      return one;
    } catch (error) {
      return new NotFoundException("Topilmadi" + error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updated = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec()
      return updated;
    } catch (error) {
      return new NotFoundException("Topilmadi" + error);
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.userModel.findByIdAndDelete(id);
      return deleted;
    } catch (error) {
      return new NotFoundException("Topilmadi" + error)
    }
  }
}
