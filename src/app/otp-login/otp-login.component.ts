import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
@Component({
  selector: 'app-otp-login',
  standalone: true,
  imports: [DialogModule,CommonModule,FormsModule,HttpClientModule,ReactiveFormsModule,TextBoxModule],
  providers: [],
  templateUrl: './otp-login.component.html',
})
export class OtpLoginComponent {
 
  @Output() close = new EventEmitter();
  @ViewChild('otpDialog') otpDialog: DialogComponent;

  public visible = true;

  isLoggedIn = false;
  phoneNumber = '';
  username = '';
  otp = '';
  step = 'phone'; // or 'verify'

  constructor(private http: HttpClient,private authService: AuthService) {}

  ngOnInit() {
    this.authService.loggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      
    // Reset on logout
    if (!status) {
      this.phoneNumber = '';
      this.username = '';
      this.otp = '';
      this.otpDialog?.hide();  // Hide dialog if open
    }
    });
  }

  sendOtp() {
    this.http
      .post('http://localhost:3000/auth/request-otp', {
        phoneNumber: this.phoneNumber,
        username: this.username,
      },{ observe: 'response' })
      .subscribe({
        next: () => (this.step = 'verify'),
        error: (err) => alert('Failed to send OTP'),
      });
  }

  verifyOtp() {
    console.log('Verifying with:', this.phoneNumber, this.otp);
    this.http.post<{ message: string }>('http://localhost:3000/auth/verify-otp', {
        phoneNumber: this.phoneNumber,
        code: this.otp,
      })
      .subscribe({
        next: (res) => {
          this.authService.login(this.username);
          // this.otpDialog.hide();
          this.close.emit(); 
          // alert(res.message); // Should show "Login successful"
        },
        error: (err) => {
          
          console.error('OTP Error:', err);
          alert('Invalid OTP');
        }
      });
  }

  onDialogClose() {
    this.close.emit();
  }
}
