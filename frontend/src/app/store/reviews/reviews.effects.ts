import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { ReviewsService } from '../../services/reviews.service';
import {
  createReviewsFailure,
  createReviewsRequest,
  createReviewsSuccess,
  deleteReviewsRequest,
  deleteReviewsSuccess, fetchAllReviewsFailure, fetchAllReviewsRequest, fetchAllReviewsSuccess,
  fetchReviewsFailure,
  fetchReviewsRequest,
  fetchReviewsSuccess
} from './reviews.actions';
import { HelpersService } from '../../services/helpers.service';
import { deleteImagesFailure } from '../images/images.actions';

@Injectable()
export class ReviewsEffects {
  fetchAllReviews = createEffect(() => this.actions.pipe(
    ofType(fetchAllReviewsRequest),
    mergeMap(() => this.reviewsService.getAllReviews().pipe(
      map(reviews => fetchAllReviewsSuccess({reviews})),
      catchError(() => of(fetchAllReviewsFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  fetchReviews = createEffect(() => this.actions.pipe(
    ofType(fetchReviewsRequest),
    mergeMap(({id}) => this.reviewsService.getReviews(id).pipe(
      map(reviews => fetchReviewsSuccess({reviews})),
      catchError(() => of(fetchReviewsFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createReview = createEffect(() => this.actions.pipe(
    ofType(createReviewsRequest),
    mergeMap(({reviewData}) => this.reviewsService.createReview(reviewData).pipe(
      map(() => createReviewsSuccess()),
      tap(() => {
        this.helpers.openSnackbar('Успешно добавлен!');
        this.store.dispatch(fetchReviewsRequest({id: reviewData.place}))
      }),
      catchError(() => of(createReviewsFailure({error: 'Wrong data'})))
    ))
  ));

  deleteReview = createEffect(() => this.actions.pipe(
    ofType(deleteReviewsRequest),
    mergeMap((id) => this.reviewsService.deleteReview(id.id).pipe(
      map(() => deleteReviewsSuccess()),
      tap(() => {
        this.store.dispatch(fetchReviewsRequest({id: id.place}));
        this.helpers.openSnackbar('Успешно удален!');

      }),
      catchError(() => of(deleteImagesFailure({error: 'No access!'})))
    ))
  ));


  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private reviewsService: ReviewsService,
    private helpers: HelpersService,
  ) {}
}
