import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

export interface OTPResponse {
  success: boolean;
  message: string;
  attemptsLeft?: number;
  formData?: any;
}

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private serverName = environment.apiUrl;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  private getRequestOptions(): { headers: HttpHeaders } {
    return { headers: this.headers };
  }

  // Send OTP to email
  sendOTP(email: string, formData: any): Observable<OTPResponse> {
    return this.http.post<OTPResponse>(
      `${this.serverName}/api/user/send-otp`,
      { email, formData },
      this.getRequestOptions()
    );
  }

  // Verify OTP
  verifyOTP(email: string, otp: string): Observable<OTPResponse> {
    return this.http.post<OTPResponse>(
      `${this.serverName}/api/user/verify-otp`,
      { email, otp },
      this.getRequestOptions()
    );
  }

  // Resend OTP
  resendOTP(email: string): Observable<OTPResponse> {
    return this.http.post<OTPResponse>(
      `${this.serverName}/api/user/resend-otp`,
      { email },
      this.getRequestOptions()
    );
  }
}
