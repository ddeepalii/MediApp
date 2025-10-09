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
  hospitalList: Hospital[] = [];
  filteredHospitalList: Hospital[] = [];
  modalSearchQuery: string = '';
  showMessage: boolean = false;
  responseMessage: string = '';
  showHospitalfilterData: boolean = false;
  showHospitalData: boolean = true;
  isClick: boolean = true;
  NotFoundMessage: string = '';
  FoundMessage: string = '';
  editingHospitalId: number | null = null;

  // ✅ Pagination Variables
  currentPage: number = 1; // current active page
  itemsPerPage: number = 6; // number of hospitals shown per page

  constructor(
    public router: Router,
    public httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    // Redirect if user role is not Hospital
    if (authService.getRole != 'HOSPITAL') {
      this.router.navigateByUrl('dashboard');
    }

    // Initialize Add/Edit Hospital Form
    this.itemForm = this.formBuilder.group({
      name: [this.formModel.name, [Validators.required]],
      location: [this.formModel.location, [Validators.required]],
    });

    // Initialize Equipment Form
    this.equipmentForm = this.formBuilder.group({
      name: [this.formModel.name, [Validators.required]],
      description: [this.formModel.description, [Validators.required]],
      hospitalId: [this.formModel.hospitalId, [Validators.required]],
    });

    // Reset messages when user types in form
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

  // ✅ Fetch all hospitals
  getHospital() {
    this.httpService.getHospital().subscribe(
      (data: Hospital[]) => {
        this.hospitalList = data;
        this.filteredHospitalList = data;
      },
      (error) => {
        this.showError = true;
        this.errorMessage = 'Error fetching hospitals. Please try again later.';
        console.error('Error fetching hospitals:', error);
      }
    );
  }

  // ✅ Get paginated hospital data
  get paginatedHospitals(): Hospital[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredHospitalList.slice(startIndex, startIndex + this.itemsPerPage);
  }
  

  // ✅ Go to next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // ✅ Go to previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // ✅ Calculate total number of pages
  get totalPages(): number {
    return Math.ceil(this.filteredHospitalList.length / this.itemsPerPage);
  }

  // ✅ Go directly to a specific page
  goToPage(page: number) {
    this.currentPage = page;
  }

  // ✅ Search Hospital
  filterHospital() {
    this.showHospitalfilterData = true;
    this.showHospitalData = false;

    if (this.modalSearchQuery.trim() !== '') {
      const searchTerm = this.modalSearchQuery.toLowerCase().trim();

      this.filteredHospitalList = this.hospitalList.filter(
        (hosp) =>
          hosp.name.toLowerCase().includes(searchTerm) ||
          hosp.location.toLowerCase().includes(searchTerm) ||
          hosp.id.toString().includes(searchTerm)
      );

      if (this.filteredHospitalList.length === 0) {
        this.isClick = false;
        this.NotFoundMessage = 'No Hospital(s) Found!';
        this.showHospitalData = true;
      } else {
        this.isClick = true;
        this.FoundMessage = `${this.filteredHospitalList.length} record(s) found!`;
        this.currentPage = 1; // reset to first page after filtering
      }
    } else {
      this.isClick = false;
      this.NotFoundMessage = 'Nothing to search';
      this.showHospitalData = true;
    }
  }

  // ✅ Clear search and show all hospitals again
  closeIt() {
    this.showHospitalfilterData = false;
    this.showHospitalData = true;
    this.filteredHospitalList = this.hospitalList;
    this.modalSearchQuery = '';
    this.currentPage = 1;
  }

  clearMessages() {
    this.showMessage = false;
    this.showError = false;
  }

  // ✅ Add or Update Hospital
  onSubmit() {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    const hospitalData = this.itemForm.value;

    if (this.editingHospitalId) {
      // Update existing hospital
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
      // Add new hospital
      this.httpService.createHospital(hospitalData).subscribe(
        () => {
          this.itemForm.reset();
          this.getHospital();
          this.showMessage = true;
          this.responseMessage = 'Hospital added successfully.';
        },
        (error) => {
          this.showError = true;
          this.errorMessage = 'Error creating hospital.';
          console.error('Error creating hospital:', error);
        }
      );
    }
  }

  // ✅ Prepare to assign equipment to hospital
  Addequipment(value: any) {
    this.equipmentForm.controls['hospitalId'].setValue(value.id);
    this.showMessage = false;
  }

  // ✅ Save equipment to hospital
  submitEquipment() {
    if (this.equipmentForm.invalid) {
      this.equipmentForm.markAllAsTouched();
      return;
    }

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
          this.errorMessage = 'Error adding equipment.';
          console.error('Error adding equipment:', error);
        }
      );
  }

  // ✅ Fill form with selected hospital data for editing
  editHospital(hospital: Hospital) {
    this.itemForm.patchValue({
      name: hospital.name,
      location: hospital.location,
    });
    this.editingHospitalId = hospital.id;
    this.clearMessages();
  }

  // ✅ Delete hospital
  deleteHospital(id: number) {
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
