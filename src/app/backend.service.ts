import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  http = inject(HttpClient);
  baseUrl="http://localhost:8080";
  animalUrl=this.baseUrl + "/api/animals";

  

  editAnimal(id: number): void {

  }

  fetchAnimals() {
    return this.http.get<any>(this.animalUrl);
  }
}
