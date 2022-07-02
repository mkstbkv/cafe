import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Image, ImageData } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  getAllImages() {
    return this.http.get<Image[]>(environment.apiUrl + '/images').pipe(
      map(response => {
        return response.map(placeData => {
          return new Image(
            placeData._id,
            placeData.user,
            placeData.place,
            placeData.image
          );
        });
      })
    );
  }

  getImages(id: string) {
    return this.http.get<Image[]>(environment.apiUrl + '/images/' + id).pipe(
      map(response => {
        return response.map(placeData => {
          return new Image(
            placeData._id,
            placeData.user,
            placeData.place,
            placeData.image
          );
        });
      })
    );
  }

  createImage(imageData: ImageData) {
    const formData = new FormData();

    Object.keys(imageData).forEach(key => {
      if (imageData[key] !== null) {
        formData.append(key, imageData[key]);
      }
    });
    return this.http.post(environment.apiUrl + '/images', formData);
  }

  deleteImage(id: string) {
    return this.http.delete(environment.apiUrl + '/images/' + id)
  }
}
