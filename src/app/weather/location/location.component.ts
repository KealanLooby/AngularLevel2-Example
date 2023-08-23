import {Component, OnInit} from '@angular/core';
import {LocationStoreService} from "../../store/location.store.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  // add name, to store
  location: string = '';

  locationForm: FormGroup = new FormGroup({});
  formError: boolean = false;

  constructor(public locationStoreService: LocationStoreService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.locationForm = this.fb.group({
      location: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
    });
  }

  submitZipcode() {

    this.locationForm.get('location')?.markAsTouched();

    console.log('location ' + this.location);
    if (this.locationForm.valid) {
      this.formError = false;
      const location = this.locationForm.value.location;
      // Do something with location
      if (!this.locationStoreService.addLocation(location)) {
        // location not added
        // error msg
        this.formError = true;
      }
    } else {
      this.formError = true;
    }

  }
}
