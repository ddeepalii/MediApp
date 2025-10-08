// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpService } from '../../services/http.service';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
// })
// export class LoginComponent implements OnInit {
//   itemForm: FormGroup;
//   formModel: any = {};
//   showError: boolean = false;
//   errorMessage: any;
//   constructor(
//     public router: Router,
//     public httpService: HttpService,
//     private formBuilder: FormBuilder,
//     private authService: AuthService
//   ) {
//     this.itemForm = this.formBuilder.group({
//       username: [this.formModel.username, [Validators.required]],
//       password: [this.formModel.password, [Validators.required]],
//       captchaInput: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {}
//   onLogin() {
//     if (this.itemForm.valid) {
//       this.showError = false;
//             this.authService.saveToken(data.token);
//             this.router.navigateByUrl('/dashboard');
//             setTimeout(() => {
//               window.location.reload();
//             }, 1000);
//           } else {
//             this.showError = true;
//             this.errorMessage = 'Wrong User or Password';
//           }
//         },
//         (error) => {
//           this.showError = true;
//           this.errorMessage =
//             'An error occurred while logging in. Please try again later.';
//           console.error('Login error:', error);
//         }
//       );
//     } else {
//       this.itemForm.markAllAsTouched();
//     }
//   }
//   registration() {
//     this.router.navigateByUrl('/registration');
//   }
// }

//////////////////////////////////////////////////////////
// ✅ New Code with Custom CAPTCHA
//////////////////////////////////////////////////////////

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formModel: any = {};
  itemForm: FormGroup;

  showError: boolean = false;
  errorMessage: any;
  captchaCode: string = '';

  constructor(
    public router: Router,
    public httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.itemForm = this.formBuilder.group({
      username: [this.formModel.username, [Validators.required]],
      password: [this.formModel.password, [Validators.required]],
      captchaInput: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.generateCaptcha();
  }

  generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    this.captchaCode = Array.from({ length: 6 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
  }

  onLogin() {
    if (this.itemForm.valid) {
      const userCaptcha = this.itemForm.get('captchaInput')?.value;
      if (userCaptcha !== this.captchaCode) {
        this.showError = true;
        this.errorMessage = 'CAPTCHA does not match. Please try again.';
        this.generateCaptcha(); // refresh CAPTCHA
        return;
      }

      this.showError = false;
      this.httpService.Login(this.itemForm.value).subscribe(
        (data: any) => {
          if (data.userNo != 0) {
            this.authService.SetRole(data.role);
            this.authService.SetUsername(data.username);
            this.authService.saveToken(data.token);
            this.router.navigateByUrl('/dashboard');
            setTimeout(() => window.location.reload(), 1000);
          } else {
            this.showError = true;
            this.errorMessage = 'Wrong User or Password';
          }
        },
        (error) => {
          this.showError = true;
          this.errorMessage =
            'An error occurred while logging in. Please try again later.';
          console.error('Login error:', error);
        }
      );
    } else {
      this.itemForm.markAllAsTouched();
    }
  }

  registration() {
    this.router.navigateByUrl('/registration');
  }
}