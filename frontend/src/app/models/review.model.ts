import { User } from './user.model';
import { Place } from './place.model';

export class Review {
  constructor(
    public _id: string,
    public user: User,
    public place: Place,
    public text: string,
    public foodRate: number,
    public serviceRate: number,
    public interiorRate: number,
    public date: string,
  ) {}
}

export interface ReviewData {
  place: string;
  text: string;
  foodRate: number;
  serviceRate: number;
  interiorRate: number;
}
