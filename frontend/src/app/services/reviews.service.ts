import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Review, ReviewData } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  getAllReviews() {
    return this.http.get<Review[]>(environment.apiUrl + '/reviews').pipe(
      map(response => {
        return response.map(reviewData => {
          return new Review(
            reviewData._id,
            reviewData.user,
            reviewData.place,
            reviewData.text,
            reviewData.foodRate,
            reviewData.serviceRate,
            reviewData.interiorRate,
            reviewData.date,
          );
        });
      })
    );
  }

  getReviews(id: string) {
    return this.http.get<Review[]>(environment.apiUrl + '/reviews/' + id).pipe(
      map(response => {
        return response.map(reviewData => {
          return new Review(
            reviewData._id,
            reviewData.user,
            reviewData.place,
            reviewData.text,
            reviewData.foodRate,
            reviewData.serviceRate,
            reviewData.interiorRate,
            reviewData.date,
          );
        });
      })
    );
  }

  createReview(reviewData: ReviewData) {
    return this.http.post(environment.apiUrl + '/reviews', reviewData);
  }

  deleteReview(id: string) {
    return this.http.delete(environment.apiUrl + '/reviews/' + id)
  }
}
