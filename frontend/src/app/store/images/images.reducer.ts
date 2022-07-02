import { createReducer, on } from '@ngrx/store';
import { ImagesState } from '../types';
import {
  createImagesFailure,
  createImagesRequest,
  createImagesSuccess, fetchAllImagesFailure, fetchAllImagesRequest, fetchAllImagesSuccess,
  fetchImagesFailure,
  fetchImagesRequest,
  fetchImagesSuccess
} from './images.actions';

const initialState: ImagesState = {
  images: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
};

export const imagesReducer = createReducer(
  initialState,
  on(fetchAllImagesRequest, state => ({...state, fetchLoading: true})),
  on(fetchAllImagesSuccess, (state, {images}) => ({
    ...state,
    fetchLoading: false,
    images
  })),
  on(fetchAllImagesFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

  on(fetchImagesRequest, state => ({...state, fetchLoading: true})),
  on(fetchImagesSuccess, (state, {images}) => ({
    ...state,
    fetchLoading: false,
    images
  })),
  on(fetchImagesFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),
  on(createImagesRequest, state => ({...state, createLoading: true})),
  on(createImagesSuccess, state => ({...state, createLoading: false})),
  on(createImagesFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error,
  })),
);
