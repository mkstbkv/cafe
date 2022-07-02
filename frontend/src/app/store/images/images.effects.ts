import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import {
  createImagesFailure,
  createImagesRequest,
  createImagesSuccess,
  fetchImagesFailure,
  fetchImagesRequest,
  fetchImagesSuccess
} from './images.actions';
import { ImagesService } from '../../services/images.service';
import { HelpersService } from '../../services/helpers.service';

@Injectable()
export class ImagesEffects {
  fetchImages = createEffect(() => this.actions.pipe(
    ofType(fetchImagesRequest),
    mergeMap(({id}) => this.imagesService.getImages(id).pipe(
      map(images => fetchImagesSuccess({images})),
      catchError(() => of(fetchImagesFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createImages = createEffect(() => this.actions.pipe(
    ofType(createImagesRequest),
    mergeMap(({imageData}) => this.imagesService.createImage(imageData).pipe(
      map(() => createImagesSuccess()),
      tap(() => {
        this.helpers.openSnackbar('Успешно добавлен!');
        this.store.dispatch(fetchImagesRequest({id: imageData.place}))
      }),
      catchError(() => of(createImagesFailure({error: 'Wrong data'})))
    ))
  ));


  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private imagesService: ImagesService,
    private helpers: HelpersService,
  ) {}
}
