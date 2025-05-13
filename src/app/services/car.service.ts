import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class CarService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:3000';

  filterCars(payload: { minPrice: number; maxPrice: number; carType: string }): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/model/filter`, payload);
  }

  getCarByBrandAndModel(payload: { company: string; modelName: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/model/get-by-brand-and-model`, payload);
  }

  getCarsByBrandAndType(payload: { company: string; carType: string }): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/model/get`, payload);
  }

  getAllModels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/model/get`);
  }
    // 🔹 Save UserSeller (First form)
  saveUserSeller(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user-seller`, data);
  }

  // 🔹 Save UsedCarDetail (Second form)
  saveUsedCar(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/used-car-detail`, data);
  }
}

// export class CarService {
 

//   constructor(private http: HttpClient) {}

//   private apiUrl = 'http://localhost:3000/model/filter';

//   filterCars(payload: { minPrice: number; maxPrice: number; carType: string }): Observable<any[]> {
//     return this.http.post<any[]>(this.apiUrl, payload);
//   }
//   getCarByBrandAndModel(payload: { company: string; modelName: string }): Observable<any> {
//     const url = 'http://localhost:3000/model/get-by-brand-and-model';
//     return this.http.post<any>(url, payload);
//   }
  

