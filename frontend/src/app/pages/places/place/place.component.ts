import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/types';
import { fetchOnePlaceRequest } from '../../../store/places/places.actions';
import { createReviewsRequest, fetchReviewsRequest } from '../../../store/reviews/reviews.actions';
import { createImagesRequest, fetchImagesRequest } from '../../../store/images/images.actions';
import { Observable } from 'rxjs';
import { Place } from '../../../models/place.model';
import { Review, ReviewData } from '../../../models/review.model';
import { Image, ImageData } from '../../../models/image.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.sass']
})
export class PlaceComponent implements OnInit {
  id = '';
  @ViewChild('formReview') formReview!: NgForm;
  @ViewChild('imageForm') imageForm!: NgForm;

  place: Observable<Place | null>
  placeLoading: Observable<boolean>
  placeError: Observable<null | string>

  reviews: Observable<Review[]>
  reviewsLoading: Observable<boolean>
  reviewsError: Observable<null | string>

  images: Observable<Image[]>
  imagesLoading: Observable<boolean>
  imagesError: Observable<null | string>

  foodRate = 0;
  serviceRate = 0;
  interiorRate = 0;
  over = 0;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.params['id'];

    this.place = store.select(state => state.places.place);
    this.placeLoading = store.select(state => state.places.fetchLoading);
    this.placeError = store.select(state => state.places.fetchError);

    this.reviews = store.select(state => state.reviews.reviews);
    this.reviewsLoading = store.select(state => state.reviews.fetchLoading);
    this.reviewsError = store.select(state => state.reviews.fetchError);

    this.images = store.select(state => state.images.images);
    this.imagesLoading = store.select(state => state.images.fetchLoading);
    this.imagesError = store.select(state => state.images.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchOnePlaceRequest({id: this.id}));
    this.store.dispatch(fetchReviewsRequest({id: this.id}));
    this.store.dispatch(fetchImagesRequest({id: this.id}));

    this.checkReviews();
  }

  checkReviews() {
    this.reviews.subscribe(reviews => {
      let a = 0;
      let b = 0;
      let c = 0;
      reviews.forEach(review => {
        a += review.foodRate;
        b += review.serviceRate;
        c += review.interiorRate;
      })
      this.foodRate = parseFloat((a/reviews.length).toFixed(1));
      this.serviceRate = parseFloat((b/reviews.length).toFixed(1));
      this.interiorRate = parseFloat((c/reviews.length).toFixed(1));

      this.over = parseFloat(((this.foodRate + this.serviceRate + this.interiorRate) / 3).toFixed(1));
    })
  }

  onSubmitFormReview() {
    const reviewData: ReviewData = {
      place: this.id,
      text: this.formReview.value.text,
      foodRate: this.formReview.value.foodRate,
      serviceRate: this.formReview.value.serviceRate,
      interiorRate: this.formReview.value.interiorRate,
    }
    this.store.dispatch(createReviewsRequest({reviewData}));
    this.checkReviews();
  }

  onSubmitImageForm() {
    const imageData: ImageData = {
      place: this.id,
      image: this.imageForm.value.image
    }

    this.store.dispatch(createImagesRequest({imageData}));
    this.checkReviews();
  }

}
