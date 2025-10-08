import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})
export class MaintenanceComponent implements OnInit {
  itemForm: FormGroup;
  maintenanceList: any[] = [];
  showError: boolean = false;
  errorMessage: string = '';
  showMessage: boolean = false;
  responseMessage: string = '';

  @ViewChild('closeBtn') closeBtn!: ElementRef;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    const role = this.authService.getRole;
    if (role !== 'HOSPITAL' && role !== 'TECHNICIAN') {
      this.router.navigateByUrl('dashboard');
    }

    this.itemForm = this.formBuilder.group({
      scheduledDate: ['', [Validators.required, this.dateValidator]],
      completedDate: ['', [Validators.required, this.dateValidator]],
      description: ['', Validators.required],
      status: ['', Validators.required],
      maintenanceId: [''],
    });
  }

  ngOnInit(): void {
    this.getMaintenance();
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(control.value)) {
      return { invalidDate: true };
    }
    return null;
  }

  getMaintenance(): void {
    this.httpService.getMaintenance().subscribe({
      next: (data: any) => {
        this.maintenanceList = data;
      },
      error: (error) => {
        this.showError = true;
        this.errorMessage = 'An error occurred while fetching maintenance.';
        console.error('Fetch error:', error);
      }
    });
  }

  edit(maintenance: any): void {
    const scheduledDate = new Date(maintenance.scheduledDate);
    const completedDate = new Date(maintenance.completedDate);

    this.itemForm.patchValue({
      scheduledDate: scheduledDate.toISOString().substring(0, 10),
      completedDate: completedDate.toISOString().substring(0, 10),
      description: maintenance.description,
      status: maintenance.status,
      maintenanceId: maintenance.id,
    });
  }

  update(): void {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    const maintenanceId = this.itemForm.get('maintenanceId')?.value;

    this.httpService.updateMaintenance(this.itemForm.value, maintenanceId).subscribe({
      next: () => {
        this.itemForm.reset();
        this.getMaintenance();
        this.responseMessage = 'Updated successfully!';
        this.showMessage = true;

        // ✅ Close modal
        this.closeBtn.nativeElement.click();

        // ✅ Hide message after 3 seconds
        setTimeout(() => {
          this.showMessage = false;
        }, 3000);
      },
      error: (error) => {
        this.showError = true;
        this.errorMessage = 'An error occurred while updating maintenance.';
        console.error('Update error:', error);
      }
    });
  }

  getStatusStyle(status: string): any {
    const baseStyle = {
      'font-weight': 'bold',
      'font-size': '20px',
    };

    if (status === 'Serviced') {
      return { ...baseStyle, color: 'green' };
    } else if (status === 'In Progress') {
      return { ...baseStyle, color: '#FFC300' };
    } else {
      return { ...baseStyle, color: '#3371FF' };
    }
  }

  delete(maintenance: any): void {
    // Optional: Add confirmation dialog
    if (confirm('Are you sure you want to delete this maintenance record?')) {
      this.httpService.deleteMaintenance(maintenance.id).subscribe({
        next: () => {
          // Refresh the maintenance list after successful deletion
          this.getMaintenance();
          
          // Show success message
          // this.responseMessage = 'Maintenance deleted successfully!';
          this.showMessage = true;
          
          // Hide message after 3 seconds
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        },
        error: (error) => {
          this.showError = true;
          this.errorMessage = 'An error occurred while deleting maintenance.';
          console.error('Delete error:', error);
          
          // Hide error message after 3 seconds
          setTimeout(() => {
            this.showError = false;
          }, 3000);
        }
      });
    }
  }
}
