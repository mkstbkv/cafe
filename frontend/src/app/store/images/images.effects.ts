import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import {
  createImagesFailure,
  createImagesRequest,
  createImagesSuccess,
  deleteImagesFailure,
  deleteImagesRequest,
  deleteImageSuccess, fetchAllImagesFailure, fetchAllImagesRequest, fetchAllImagesSuccess,
  fetchImagesFailure,
  fetchImagesRequest,
  fetchImagesSuccess
} from './images.actions';
import { ImagesService } from '../../services/images.service';
import { HelpersService } from '../../services/helpers.service';

@Injectable()
export class ImagesEffects {
  fetchAllImages = createEffect(() => this.actions.pipe(
    ofType(fetchAllImagesRequest),
    mergeMap(() => this.imagesService.getAllImages().pipe(
      map(images => fetchAllImagesSuccess({images})),
      catchError(() => of(fetchAllImagesFailure({
        error: 'Something went wrong'
      })))
    ))
  ));
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

  deleteImage = createEffect(() => this.actions.pipe(
    ofType(deleteImagesRequest),
    mergeMap((id) => this.imagesService.deleteImage(id.id).pipe(
      map(() => deleteImageSuccess()),
      tap(() => {
        this.store.dispatch(fetchImagesRequest({id: id.place}));
        this.helpers.openSnackbar('Успешно удален!');
      }),
      catchError(() => of(deleteImagesFailure({error: 'No access!'})))
    ))
  ));


  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private imagesService: ImagesService,
    private helpers: HelpersService,
  ) {}
}
