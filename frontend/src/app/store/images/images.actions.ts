import { createAction, props } from '@ngrx/store';
import { Image, ImageData } from '../../models/image.model';

export const fetchImagesRequest = createAction(
  '[Images] Fetch Request',
  props<{id: string}>()
);
export const fetchImagesSuccess = createAction(
  '[Images] Fetch Success',
  props<{images: Image[]}>()
);
export const fetchImagesFailure = createAction(
  '[Images] Fetch Failure',
  props<{error: string}>()
);

export const createImagesRequest = createAction(
  '[Images] Create Request',
  props<{imageData: ImageData}>()
);
export const createImagesSuccess = createAction(
  '[Images] Create Success'
);
export const createImagesFailure = createAction(
  '[Images] Create Failure',
  props<{error: string}>()
);

export const deleteImagesRequest = createAction(
  '[Images] Delete Request',
  props<{id: string, place: string}>()
);
export const deleteImageSuccess = createAction(
  '[Images] Delete Success'
);
export const deleteImagesFailure = createAction(
  '[Images] Delete Failure',
  props<{error: string}>()
);
