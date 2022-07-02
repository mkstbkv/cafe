import { createReducer, on } from '@ngrx/store';
import { PlacesState } from '../types';
import {
  createPlacesFailure,
  createPlacesRequest,
  createPlacesSuccess, fetchOnePlaceFailure, fetchOnePlaceRequest, fetchOnePlaceSuccess,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess
} from './places.actions';

const initialState: PlacesState = {
  places: [],
  place: null,
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
};

export const placesReducer = createReducer(
  initialState,
  on(fetchPlacesRequest, state => ({...state, fetchLoading: true})),
  on(fetchPlacesSuccess, (state, {places}) => ({
    ...state,
    fetchLoading: false,
    places
  })),
  on(fetchPlacesFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),
  on(fetchOnePlaceRequest, state => ({...state, fetchLoading: true})),
  on(fetchOnePlaceSuccess, (state, {place}) => ({
    ...state,
    fetchLoading: false,
    place
  })),
  on(fetchOnePlaceFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),
  on(createPlacesRequest, state => ({...state, createLoading: true})),
  on(createPlacesSuccess, state => ({...state, createLoading: false})),
  on(createPlacesFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error,
  })),
);
