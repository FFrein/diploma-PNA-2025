import { goodsType } from '@prisma/client';

export class CreateGoodDto {
  type: goodsType;
  name: string;
  price: number;
  description: string;
}
