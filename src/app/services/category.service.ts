import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // getCarById(id: number) {
  //   throw new Error('Method not implemented.');
  // }
  private apiUrl = 'http://localhost:3000';
 
  // private apiUrl1 = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  getAllCars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/new-cars`);
}

getdataById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/new-cars/${id}`);
}

getMakeById(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/make`);
}
getMakeByIdd(makeId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/make/${makeId}`);
}

// getMakeByI(makeId: number): Observable<any> {
//   return this.http.get(`${this.apiUrl}/make/${makeId}`);
// }

// getModelsByMake(make: string): Observable<any[]> {
//   return this.http.get<any[]>(`http://localhost:3000/models?make=${make}`);
// }

// car.service.ts
getCarByType(carType: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/model?carType=${carType}`);
}

// getModelsByPriceRange(min: number, max: number): Observable<any[]> {
//   // return this.http.get<any[]>(`${this.apiUrl}/model?minPrice=${minPrice}&maxPrice=${maxPrice}`);
//   return this.http.get<any[]>(`http://localhost:3000/model?price_gte=${min}&price_lte=${max}`);

// }

// getModelsByPriceRange(minPrice: number, maxPrice: number) {
//   const params = new HttpParams()
//     .set('minPrice', minPrice.toString())
//     .set('maxPrice', maxPrice.toString());

//   return this.http.get<any[]>('http://localhost:3000/model', { params });
// }
// category.service.ts
getModelsByPriceRange(minPrice: number, maxPrice: number): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:3000/model', {
    params: {
      minPrice: minPrice.toString(),
      maxPrice: maxPrice.toString()
    }
  });
}


getUsedCarByUserId(userId: number): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:3000/used-car-detail/by-user/${userId}`);
}

}