import { createAction, props } from '@ngrx/store';
import { Review, ReviewData } from '../../models/review.model';

export const fetchReviewsRequest = createAction(
  '[Reviews] Fetch Request',
  props<{id: string}>()
);
export const fetchReviewsSuccess = createAction(
  '[Reviews] Fetch Success',
  props<{reviews: Review[]}>()
);
export const fetchReviewsFailure = createAction(
  '[Reviews] Fetch Failure',
  props<{error: string}>()
);

export const createReviewsRequest = createAction(
  '[Reviews] Create Request',
  props<{reviewData: ReviewData}>()
);
export const createReviewsSuccess = createAction(
  '[Reviews] Create Success'
);
export const createReviewsFailure = createAction(
  '[Reviews] Create Failure',
  props<{error: string}>()
);

export const deleteReviewsRequest = createAction(
  '[Reviews] Delete Request',
  props<{id: string, place: string}>()
);
export const deleteReviewsSuccess = createAction(
  '[Reviews] Delete Success'
);
export const deleteReviewFailure = createAction(
  '[Reviews] Delete Failure',
  props<{error: string}>()
);
