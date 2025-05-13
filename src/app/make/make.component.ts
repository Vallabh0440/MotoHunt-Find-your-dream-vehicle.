import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-make',
  imports: [CommonModule],
  templateUrl: './make.component.html',
  styleUrl: './make.component.css'
})
export class MakeComponent {
 
  // getMakeData(){
  //   this.categoryService.getMakeById().subscribe((data) => {
  //     this.makeData = data;
  //     console.log('Make Data:', this.makeData); // 👈 Logs the make data
  //   }
  //   );
  // }

  // getMakeData(): void {
  //   this.categoryService.getMakeById().subscribe(
  //     (data) => {
  //       this.makeData = data;
  //       console.log('All Makes:', this.makeData);
  //     },
  //     (error) => {
  //       console.error('Error fetching make data', error);
  //     }
  //   );
  // }
}
