import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import {
  ItemModel,
  DropDownButtonModule,
} from '@syncfusion/ej2-angular-splitbuttons';
import {
  MenuItemModel as BaseMenuItemModel,
  MenuEventArgs,
  AppBarModule,
  MenuModule,
} from '@syncfusion/ej2-angular-navigations';

interface MenuItemModel extends BaseMenuItemModel {
  action?: string;
}
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { CommonModule, NgFor } from '@angular/common';
// import { Action } from 'rxjs/internal/scheduler/Action';
import { Route, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { HttpClientModule } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  providers: [CategoryService],
  imports: [
    CommonModule,
    ButtonModule,
    DropDownButtonModule,
    AppBarModule,
    HttpClientModule,
    RouterModule,
    MenuModule,
    RouterOutlet,
    RouterLink
],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  })
export class NavbarComponent {

  public menuItems: any[] = [];

  showHome:boolean=true;  
  selectedModel: string | null = null;
  selectedCar: string | null = null;

  @Output() modelSelected = new EventEmitter<string>();
  @Output() variantSelected = new EventEmitter<string>(); 
  // Emit variant selection
  constructor(private router: Router, private categoryService: CategoryService) {}

  ngOnInit() {
    // this.fetchCategories();
    // this.loadNewCarsMenu();
    // this.loaddataById(1)
    this.fetchMenuData();
  }

  returnToHome(){
    console.log('Navigating to home...');
    this.router.navigate(['/home']);
}

fetchMenuData(): void {
  this.categoryService.getAllCars().subscribe(
    (data: any[]) => {
      this.menuItems = [];

      data.forEach(category => {
        const parentItem: any = {
          text: category.newCarName,
          items: []
        };

        category.categories.forEach((subCategory: any) => {
          const subItem: any = {
            text: subCategory.carCategory,
            items: [] // Will be filled with models later
          };

          // Fetch detailed data by ID for each main category
          this.categoryService.getdataById(category.newCarId).subscribe(
            (detailed: any) => {
              // Find the same subCategory to get make/model
              const matchedCategory = detailed.categories.find((c: any) => c.carCategory === subCategory.carCategory);
              
              if (matchedCategory && matchedCategory.make) {
                matchedCategory.make.forEach((makeItem: any) => {
                  makeItem.model.forEach((modelItem: any) => {
                    subItem.items.push({ text: modelItem.modelName });
                  });
                });

                // Optionally add "All Electric Cars" like link
                subItem.items.push({
                  text: `All ${subCategory.carCategory}`
                });
              }
            },
            error => {
              console.error(`Error fetching details for ID ${category.newCarId}`, error);
            }
          );

          parentItem.items.push(subItem);
        });

        this.menuItems.push(parentItem);
      });
    },
    error => {
      console.error('Error fetching all cars:', error);
    }
  );
}

getDetailsById(id: number): void {
  this.categoryService.getdataById(id).subscribe(
    (detailedData: any) => {
      console.log('Detailed data for ID', id, detailedData);
      // You can use this data for deeper nesting (e.g., make, model, variant)
      // Example: update menuItems with make/model under specific category
    },
    (error: any) => {
      console.error(`Error fetching data for ID ${id}:`, error);
    }
  );
}

  onMenuItemClick(args: MenuEventArgs): void {
    const selectedItem = args.item;
    console.log('Selected Item:', selectedItem.text);
  
    if (selectedItem.items && selectedItem.items.length > 0) {
      // The item has sub-items (e.g., variants), handle accordingly
      console.log('Sub-items:', selectedItem.items);
      // You can expand the submenu or perform other actions here
    } 
  }
  

  public usedcarsDropDownButtonItems: MenuItemModel[] = []

  public companyDropDownButtonItems: MenuItemModel[] = []
  
  public verticalMenuItems: MenuItemModel[] = []

  onVariantSelect(variant: string) {
    this.selectedCar = variant;
    this.variantSelected.emit(variant);
  }
  
  public appBarColors: {
    colorMode: string;
    colorClass: string;
    isPrimary: boolean;
    loginClass: string;
  }[] = [
    {
      colorMode: 'Inherit',
      colorClass: 'e-inherit',
      isPrimary: true,
      loginClass: 'login',
    },
  ];  
 
  public onBeforeItemRender(args: MenuEventArgs): void {
    if (
      args.element.children.length > 0 &&
      args.element.children[0].classList.contains('e-more-vertical-1')
    ) {
      args.element.setAttribute('aria-label', 'more vertical');
    }
  }

}

