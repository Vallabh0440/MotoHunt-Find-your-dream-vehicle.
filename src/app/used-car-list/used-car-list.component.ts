import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { OtpLoginComponent } from '../otp-login/otp-login.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-used-car-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DialogModule, ButtonModule,OtpLoginComponent],
  
  templateUrl: './used-car-list.component.html',
  styleUrls: ['./used-car-list.component.css'],
})
export class UsedCarListComponent {
  usedCars: any[] = [];
  selectedSeller: any = null;
  // showDialog = false;
    showSellerDialog = false;
  isLoggedIn = false;
  showOtpLogin = false;
  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/used-car-detail').subscribe((data) => {
      this.usedCars = data;
      console.log(this.usedCars);
    });

   // 🔄 Listen to login status
    this.authService.loggedIn$.subscribe((status) => {
      this.isLoggedIn = status;

      // After login, show seller details if previously attempted
      if (status && this.selectedSeller) {
        this.showSellerDialog = true;
      }
    });
  }


 viewSellerDetails(seller: any) {
    if (this.isLoggedIn) {
      this.selectedSeller = seller;
      this.showSellerDialog = true;
    } else {
      this.selectedSeller = seller;
      this.showOtpLogin = true;
    }
  // viewSellerDetails(seller: any) {
  //   this.selectedSeller = seller;
  //   this.showDialog = true;
  // }
  }
    closeSellerDialog() {
    this.showSellerDialog = false;
  }

  handleLoginClose() {
    this.showOtpLogin = false;
  }
  // closeDialog() {
  //   this.showDialog = false;
  // }
  getImageUrl(filename: string): string {
    return `http://localhost:3000/${filename}`; // full URL to access static file
  }
}
