import { NgModule } from '@angular/core';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { EffectsModule } from '@ngrx/effects';
import { usersReducer } from './users/users.reducer';
import { UsersEffects } from './users/users.effects';
import { placesReducer } from './places/places.reducer';
import { PlacesEffects } from './places/places.effects';
import { reviewsReducer } from './reviews/reviews.reducer';
import { ReviewsEffects } from './reviews/reviews.effects';
import { ImagesEffects } from './images/images.effects';
import { imagesReducer } from './images/images.reducer';

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
}

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

const reducers = {
  users: usersReducer,
  places: placesReducer,
  reviews: reviewsReducer,
  images: imagesReducer,
};

const effects = [UsersEffects, PlacesEffects, ReviewsEffects, ImagesEffects];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
  ],
  exports: [StoreModule, EffectsModule]
})
export class AppStoreModule {}
