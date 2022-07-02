import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppState } from '../../../store/types';
import { Store } from '@ngrx/store';
import { PlaceData } from '../../../models/place.model';
import { createPlacesRequest } from '../../../store/places/places.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.sass']
})
export class NewPlaceComponent {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.places.createLoading);
    this.error = store.select(state => state.places.createError);
  }

  onSubmit() {
    const placeData: PlaceData = this.form.value;
    this.store.dispatch(createPlacesRequest({placeData}));
  }
}
