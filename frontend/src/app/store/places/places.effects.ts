import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import {
  createPlacesFailure,
  createPlacesRequest,
  createPlacesSuccess,
  deletePlaceRequest,
  deletePlacesFailure,
  deletePlaceSuccess,
  fetchOnePlaceFailure,
  fetchOnePlaceRequest,
  fetchOnePlaceSuccess,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess
} from './places.actions';
import { PlacesService } from '../../services/places.service';

@Injectable()
export class PlacesEffects {
  fetchPlaces = createEffect(() => this.actions.pipe(
    ofType(fetchPlacesRequest),
    mergeMap(() => this.placesService.getPLaces().pipe(
      map(places => fetchPlacesSuccess({places})),
      catchError(() => of(fetchPlacesFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  fetchPlace = createEffect(() => this.actions.pipe(
    ofType(fetchOnePlaceRequest),
    mergeMap(({id}) => this.placesService.getPLace(id).pipe(
      map(place => fetchOnePlaceSuccess({place})),
      catchError(() => of(fetchOnePlaceFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createPlace = createEffect(() => this.actions.pipe(
    ofType(createPlacesRequest),
    mergeMap(({placeData}) => this.placesService.createPlace(placeData).pipe(
      map(() => createPlacesSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createPlacesFailure({error: 'Wrong data'})))
    ))
  ));

  deletePlace = createEffect(() => this.actions.pipe(
    ofType(deletePlaceRequest),
    mergeMap(({id}) => this.placesService.deletePlace(id).pipe(
      map(() => deletePlaceSuccess()),
      tap(() => {
        this.store.dispatch(fetchPlacesRequest());
      }),
      catchError(() => of(deletePlacesFailure({error: 'No access!'})))
    ))
  ));


  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private placesService: PlacesService,
    private router: Router
  ) {}
}
