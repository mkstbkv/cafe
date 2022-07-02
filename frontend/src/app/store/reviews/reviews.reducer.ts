import { createReducer, on } from '@ngrx/store';
import { ReviewsState } from '../types';
import {
  createReviewsFailure,
  createReviewsRequest,
  createReviewsSuccess, fetchAllReviewsFailure, fetchAllReviewsRequest, fetchAllReviewsSuccess,
  fetchReviewsFailure,
  fetchReviewsRequest,
  fetchReviewsSuccess
} from './reviews.actions';

const initialState: ReviewsState = {
  reviews: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
};

export const reviewsReducer = createReducer(
  initialState,
  on(fetchReviewsRequest, state => ({...state, fetchLoading: true})),
  on(fetchReviewsSuccess, (state, {reviews}) => ({
    ...state,
    fetchLoading: false,
    reviews
  })),
  on(fetchReviewsFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

  on(fetchAllReviewsRequest, state => ({...state, fetchLoading: true})),
  on(fetchAllReviewsSuccess, (state, {reviews}) => ({
    ...state,
    fetchLoading: false,
    reviews
  })),
  on(fetchAllReviewsFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),
  on(createReviewsRequest, state => ({...state, createLoading: true})),
  on(createReviewsSuccess, state => ({...state, createLoading: false})),
  on(createReviewsFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error,
  })),
);
