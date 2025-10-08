import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  passwordStrength: string = '';
  passwordMessage: string = '';
  emailReg: RegExp = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-z]{2,}$/;

  pMessage = `1) At least one lowercase alphabet i.e. [a-z]
  2) At least one uppercase alphabet i.e. [A-Z]
  3 digit i.e. [0-9]
  4) At least one special character i.e. ['@', '$', '.', '#', '!', '%', '*', '?', '&', '^']
  5) The total length must be minimum of 8`;

  strengthColors: { [key: string]: string } = {
    'Password is Required.': 'red',
    'Weak': 'red',
    'Medium': 'orange',
    'Strong': 'green'
  };

  itemForm: FormGroup;
  formModel: any = { role: null, email: '', password: '', username: '', confirmPassword: '' };
  showMessage: boolean = false;
  showError: boolean = false;
  responseMessage: any;

  // ✅ Added for CAPTCHA
  captchaCode: string = '';

  constructor(public router: Router, private bookService: HttpService, private formBuilder: FormBuilder) {
    this.itemForm = this.formBuilder.group({
      username: [this.formModel.username, Validators.required],
      password: [this.formModel.password, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$.#!%*?&^])[a-zA-Z0-9@$.#!%*?&^]+$')]],
      confirmPassword: [this.formModel.confirmPassword, [Validators.required]],
      email: [this.formModel.email, [Validators.required, Validators.pattern(this.emailReg)]],
      role: [this.formModel.role, Validators.required],
      captchaInput: ['', Validators.required] // ✅ Added CAPTCHA input field
    },
    { validators: this.checkPasswords });
  }

  ngOnInit(): void {
    this.generateCaptcha(); // ✅ Generate CAPTCHA on load
  }

  // ✅ CAPTCHA generator
  generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    this.captchaCode = Array.from({ length: 6 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
  }

  onRegister() {
    const userCaptcha = this.itemForm.get('captchaInput')?.value;
    if (userCaptcha !== this.captchaCode) {
      this.showError = true;
      this.responseMessage = 'CAPTCHA does not match. Please try again.';
      this.generateCaptcha(); // refresh CAPTCHA
      return;
    }

    this.bookService.registerUser(this.itemForm.value).subscribe(
      (response: any) => {
        this.showMessage = true;
        if (response == null) {
          this.showError = false;
          this.responseMessage = "User Already Exist";
        } else {
          const username = this.itemForm.get('username')?.value;
          const role = this.itemForm.get('role')?.value;
          this.responseMessage = `Welcome ${username} to our page!!. You are an ${role === 'HOSPITAL' ? 'Admin' : role} now`;
          this.itemForm.reset();
        }
      },
      (error: any) => {
        this.showError = true;
        this.responseMessage = 'An error occurred while registering.';
      }
    );

    console.log(this.itemForm.value);
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password !== confirmPassword || password === "") {
      group.get('confirmPassword')?.setErrors({ notSame: true });
    } else {
      group.get('confirmPassword')?.setErrors(null);
    }
  }

  hasLowercase = false;
  hasUppercase = false;
  hasDigit = false;
  hasSpecialChar = false;
  hasMinLength = false;

  checkPasswordStrength(): void {
    const password = this.itemForm.get('password')?.value || '';

    this.hasLowercase = /[a-z]/.test(password);
    this.hasUppercase = /[A-Z]/.test(password);
    this.hasDigit = /[0-9]/.test(password);
    this.hasSpecialChar = /[@$.#!%*?&^]/.test(password);
    this.hasMinLength = password.length >= 8;

    const allValid = this.hasLowercase && this.hasUppercase && this.hasDigit && this.hasSpecialChar && this.hasMinLength;

    if (password === '') {
      this.passwordStrength = 'Password is Required.';
    } else if (!allValid) {
      this.passwordStrength = 'Medium';
    } else {
      this.passwordStrength = 'Strong';
    }

    this.passwordMessage = allValid ? '' : this.pMessage;
  }
}