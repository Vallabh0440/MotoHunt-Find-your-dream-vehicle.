// src/app/services/car.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
 
  
private apiUrll = 'http://localhost:3000/model';  // Your model filter URL

constructor(private http: HttpClient) {}

// Function to fetch filtered car models
getFilteredModels(minPrice: number, maxPrice: number): Observable<any[]> {
const params = new HttpParams()
  .set('minPrice', minPrice.toString())
  .set('maxPrice', maxPrice.toString());

return this.http.get<any[]>(this.apiUrll, { params });
}

}
