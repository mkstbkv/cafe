import { createAction, props } from '@ngrx/store';
import { Place, PlaceData } from '../../models/place.model';

export const fetchPlacesRequest = createAction('[Places] Fetch Request');
export const fetchPlacesSuccess = createAction(
  '[Places] Fetch Success',
  props<{places: Place[]}>()
);
export const fetchPlacesFailure = createAction(
  '[Places] Fetch Failure',
  props<{error: string}>()
);

export const createPlacesRequest = createAction(
  '[Places] Create Request',
  props<{placeData: PlaceData}>()
);
export const createPlacesSuccess = createAction(
  '[Places] Create Success'
);
export const createPlacesFailure = createAction(
  '[Places] Create Failure',
  props<{error: string}>()
);
