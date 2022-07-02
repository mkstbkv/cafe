import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Place, PlaceData } from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient) { }

  getPLaces() {
    return this.http.get<Place[]>(environment.apiUrl + '/places').pipe(
      map(response => {
        return response.map(placeData => {
          return new Place(
            placeData._id,
            placeData.user,
            placeData.title,
            placeData.description,
            placeData.image
          );
        });
      })
    );
  }

  getPLace(id: string) {
    return this.http.get<Place>(environment.apiUrl + '/places/' + id).pipe(
      map(response => {
        return new Place(
          response._id,
          response.user,
          response.title,
          response.description,
          response.image
        );
      })
    );
  }

  createPlace(placeData: PlaceData) {
    const formData = new FormData();

    Object.keys(placeData).forEach(key => {
      if (placeData[key] !== null) {
        formData.append(key, placeData[key]);
      }
    });
    return this.http.post(environment.apiUrl + '/places', formData);
  }
}
