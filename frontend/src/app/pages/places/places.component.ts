import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Place } from '../../models/place.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { deletePlaceRequest, fetchPlacesRequest } from '../../store/places/places.actions';
import { Review } from '../../models/review.model';
import { Image } from '../../models/image.model';
import { fetchAllReviewsRequest, fetchReviewsRequest } from '../../store/reviews/reviews.actions';
import { fetchAllImagesRequest } from '../../store/images/images.actions';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.sass']
})

export class PlacesComponent implements OnInit {
  places: Observable<Place[]>
  reviews: Observable<Review[]>
  images: Observable<Image[]>
  loading: Observable<boolean>
  error: Observable<null | string>
  placesSub!: Subscription;
  revSub!: Subscription;
  imageSub!: Subscription;

  constructor(private store: Store<AppState>) {
    this.places = store.select(state => state.places.places);
    this.reviews = store.select(state => state.reviews.reviews);
    this.images = store.select(state => state.images.images);
    this.loading = store.select(state => state.places.fetchLoading);
    this.error = store.select(state => state.places.fetchError);
  }


  ngOnInit() {
    this.store.dispatch(fetchPlacesRequest());
    this.store.dispatch(fetchAllReviewsRequest());
    this.store.dispatch(fetchAllImagesRequest());

  }

  deletePlace(id: string) {
    this.store.dispatch(deletePlaceRequest({id}));
  }
}
