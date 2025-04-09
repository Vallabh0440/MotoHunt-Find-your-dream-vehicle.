import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/new-cars';
 

  constructor(private http: HttpClient) {}

  getAllCars(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
}

getdataById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}
}