import { LoginError, RegisterError, User } from '../models/user.model';
import { Place } from '../models/place.model';
import { Review } from '../models/review.model';
import { Image } from '../models/image.model';

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
}

export type PlacesState = {
  places: Place[],
  place: Place | null,
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
}


export type ReviewsState = {
  reviews: Review[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
}

export type ImagesState = {
  images: Image[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
}

export type AppState = {
  users: UsersState,
  places: PlacesState,
  reviews: ReviewsState,
  images: ImagesState,
}


