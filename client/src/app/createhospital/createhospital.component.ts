
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { HttpService } from '../../services/http.service';
import { Hospital } from '../model/Service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-createhospital',
  templateUrl: './createhospital.component.html',
  styleUrls: ['./createhospital.component.scss'],
})
export class CreatehospitalComponent implements OnInit, OnDestroy {
  private formSubscription: Subscription;
  itemForm: FormGroup;
  equipmentForm: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  hospitalList: any = [];
  assignModel: any = {};
  filteredHospitalList: any = [];
  modalSearchQuery: any;
  showMessage: any;
  responseMessage: any;
  showHospitalfilterData: boolean = false;
  showHospitalData: boolean = true;
  isClick: boolean = true;
  search: Hospital[] = [];
  NotFoundMessage: string = '';
  FoundMessage: string = '';
  editingHospitalId: number | null = null;

  constructor(
    public router: Router,
    public httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    if (authService.getRole != 'HOSPITAL') {
      this.router.navigateByUrl('dashboard');
    }

    this.itemForm = this.formBuilder.group({
      name: [this.formModel.name, [Validators.required]],
      location: [this.formModel.location, [Validators.required]],
    });

    this.equipmentForm = this.formBuilder.group({
      name: [this.formModel.name, [Validators.required]],
      description: [this.formModel.description, [Validators.required]],
      hospitalId: [this.formModel.hospitalId, [Validators.required]],
    });

    this.formSubscription = this.itemForm.valueChanges.subscribe(() => {
      this.clearMessages();
    });
  }

  ngOnInit(): void {
    this.getHospital();
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  getHospital() {
    this.httpService.getHospital().subscribe(
      (data: any) => {
        this.hospitalList = data;
        this.search = data;
      },
      (error) => {
        this.showError = true;
        this.errorMessage = 'An error occurred while fetching hospitals. Please try again later.';
        console.error('Error fetching hospitals:', error);
      }
    );
  }

  filterHospital() {
    this.showHospitalfilterData = true;
    this.showHospitalData = false;

    if (!!this.modalSearchQuery) {
      const searchTerm = this.modalSearchQuery.toLowerCase().trim();
      this.filteredHospitalList = this.hospitalList.filter(
        (hosp: Hospital) =>
          hosp.name.toLowerCase().trim() === searchTerm ||
          hosp.location.toLowerCase().trim() === searchTerm ||
          hosp.id == searchTerm
      );
      if (this.filteredHospitalList.length == 0) {
        this.isClick = false;
        this.NotFoundMessage = 'No Hospital(s) Found!!';
        this.showHospitalData = true;
      } else {
        this.isClick = true;
        this.FoundMessage = this.filteredHospitalList.length + ' record(s) found!!';
      }
    } else {
      this.isClick = false;
      this.NotFoundMessage = 'Nothing to search';
      this.showHospitalData = true;
    }
  }

  closeIt() {
    this.showHospitalfilterData = false;
    this.showHospitalData = true;
    this.modalSearchQuery = '';
  }

  clearMessages() {
    this.showMessage = false;
    this.showError = false;
  }

  onSubmit() {
    if (this.itemForm.valid) {
      const hospitalData = this.itemForm.value;

      if (this.editingHospitalId) {
        this.httpService.updateHospital(this.editingHospitalId, hospitalData).subscribe(
          () => {
            this.responseMessage = 'Hospital updated successfully.';
            this.showMessage = true;
            this.editingHospitalId = null;
            this.itemForm.reset();
            this.getHospital();
          },
          (error) => {
            this.showError = true;
            this.errorMessage = 'Error updating hospital.';
            console.error('Error updating hospital:', error);
          }
        );
      } else {
        const newHospitalName = hospitalData.name.toLowerCase().trim();
        const newHospitalLocation = hospitalData.location.toLowerCase().trim();

        const isDuplicate = this.hospitalList.some((hospital: Hospital) => {
          return (
            hospital.name.toLowerCase().trim() === newHospitalName &&
            hospital.location.toLowerCase().trim() === newHospitalLocation
          );
        });

        if (isDuplicate) {
          this.showError = true;
          this.errorMessage = 'This hospital already exists.';
          this.showMessage = false;
        } else {
          this.httpService.createHospital(hospitalData).subscribe(
            () => {
              this.itemForm.reset();
              this.getHospital();
              this.showMessage = true;
              this.responseMessage = 'Hospital added successfully';
              this.showError = false;
            },
            (error) => {
              this.showError = true;
              this.errorMessage = 'An error occurred while creating hospital. Please try again later.';
              console.error('Error creating hospital:', error);
            }
          );
        }
      }
    } else {
      this.itemForm.markAllAsTouched();
    }
  }

  Addequipment(value: any) {
    this.equipmentForm.controls['hospitalId'].setValue(value.id);
    this.showMessage = false;
  }

  
  submitEquipment() {
    if (this.equipmentForm.valid) {
      this.httpService
        .addEquipment(this.equipmentForm.value, this.equipmentForm.controls['hospitalId'].value)
        .subscribe(
          () => {
            this.showMessage = true;
            this.responseMessage = 'Equipment added successfully';
            this.equipmentForm.reset();
          },
          (error) => {
            this.showError = true;
            this.errorMessage = 'An error occurred while adding equipment. Please try again later.';
            console.error('Error adding equipment:', error);
          }
        );
    } else {
      this.equipmentForm.markAllAsTouched();
    }
  }

  editHospital(hospital: Hospital): void {
    this.itemForm.patchValue({
      name: hospital.name,
      location: hospital.location
    });
    
    this.editingHospitalId = hospital.id;
    this.clearMessages();
  }

  deleteHospital(id: number): void {
    this.httpService.deleteHospital(id).subscribe(
      () => {
        this.getHospital();
        this.responseMessage = 'Hospital deleted successfully.';
        this.showMessage = true;
      },
      (error) => {
        this.errorMessage = 'Error deleting hospital.';
        this.showError = true;
        console.error('Error deleting hospital:', error);
      }
    );
  }
}
