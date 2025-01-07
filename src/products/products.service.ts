import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    try {
      const one = await this.productModel.findById(id);
      return one;
    } catch (error) {
      return new NotFoundException("Topilmadi" + error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const updated = await this.productModel
        .findByIdAndUpdate(id, updateProductDto, { new: true })
        .exec()
      return updated;
    } catch (error) {
      return new NotFoundException("Topilmadi" + error);
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.productModel.findByIdAndDelete(id);
      return deleted;
    } catch (error) {
      return new NotFoundException("Topilmadi" + error)
    }
  }
}
