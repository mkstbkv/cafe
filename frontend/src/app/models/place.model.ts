import { User } from './user.model';

export class Place {
  constructor(
    public _id: string,
    public user: User,
    public title: string,
    public description: string,
    public image: string,
  ) {}
}

export interface PlaceData {
  [key: string]: any;
  title: string;
  description: string;
  image: File | null;
  iAgree: boolean;
}
