import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../services/car.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sell-my-car',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,HttpClientModule],
  providers: [CarService],
  templateUrl: './sell-my-car.component.html',
  styleUrl: './sell-my-car.component.css'
})
export class SellMyCarComponent {
  userForm!: FormGroup;
  carForm!: FormGroup;
  currentStep = 0;
  userId: number | null = null;

  constructor(private fb: FormBuilder, private carService: CarService, private router: Router) {
    this.initForms();
  }

  initForms() {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      userEmail: ['', Validators.required],
      userAddress: ['', Validators.required],
      userCity: ['', Validators.required]
    });

    this.carForm = this.fb.group({
      carName: ['', Validators.required],
      carBrand: ['', Validators.required],
      imageUrl: ['', Validators.required],
      carPrice: [0, Validators.required],
      carEngine: ['', Validators.required],
      cartransmission: ['', Validators.required],
      fuelType: ['', Validators.required],
      driveType: ['', Validators.required],
      carType: ['', Validators.required],
      kilometersDriven: [0, Validators.required],
      ownership: ['', Validators.required]
    });
  }

  startSelling() {
    this.currentStep = 1;
  }

  loadUsedCarForm(): void {
    if (this.userForm.valid) {
      this.carService.saveUserSeller(this.userForm.value).subscribe({
        next: (response) => {
          console.log('User saved:', response);
          this.userId = response.userId;
          this.currentStep = 2;
        },
        error: (err) => console.error('User save error:', err)
      });
    } else {
      console.warn('User form is invalid.');
    }
  }

  submitCarDetails(): void {
    if (this.carForm.valid && this.userId) {
      const payload = {
        ...this.carForm.value,
        userSeller: { userId: this.userId }
      };
      this.carService.saveUsedCar(payload).subscribe({
        next: (res) => {
          console.log('Used car saved:', res);
          alert('Your car has been listed successfully!');
          this.resetForms();
          this.currentStep = 0;
          this.router.navigate(['/']); // redirect to home or desired route
        },
        error: (err) => console.error('Car save error:', err)
      });
    } else {
      console.warn('Car form is invalid or userId is null.');
    }
  }

  resetForms() {
    this.userForm.reset();
    this.carForm.reset();
    this.userId = null;
  }
}
