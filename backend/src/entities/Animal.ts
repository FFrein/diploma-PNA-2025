import { animalType, color, health, role, size } from '@prisma/client';

export class Animal {
  id: Number;
  name: String;
  animalType: animalType;
  health: health;
  diseasesDescription?: String;
  age!: Number;
  size!: size;
  color!: color;
  foodPerDay: Number;
  toiletPerDay: Number;
  description: String;
  animalBreedId: Number;
  sterilized: Boolean;
}
