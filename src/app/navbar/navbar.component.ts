import {Component,EventEmitter,Output,ViewEncapsulation,} from '@angular/core';
import {ItemModel,DropDownButtonModule,} from '@syncfusion/ej2-angular-splitbuttons';
import {MenuItemModel as BaseMenuItemModel,MenuEventArgs,AppBarModule,MenuModule} from '@syncfusion/ej2-angular-navigations';

interface MenuItemModel extends BaseMenuItemModel {action?: string;}
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { CommonModule, NgFor } from '@angular/common';
// import { Action } from 'rxjs/internal/scheduler/Action';
import { Route,Router,RouterLink,RouterModule, RouterOutlet,} from '@angular/router';
import { CategoryService } from '../services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { ModelDetailComponent } from '../model-detail/model-detail.component';
import { ExploreNewCarComponent } from '../explore-new-car/explore-new-car.component';
import { OtpLoginComponent } from '../otp-login/otp-login.component';
import { AuthService } from '../services/auth.service';

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
    RouterLink,
    ModelDetailComponent,
    ExploreNewCarComponent,
    OtpLoginComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  public menuItems: any[] = [];
  public usedcarsDropDownButtonItems: MenuItemModel[] = [];
  public companyDropDownButtonItems: MenuItemModel[] = [];
  public verticalMenuItems: MenuItemModel[] = [];

  blank: any[] = [];

  showHome: boolean = true;
  selectedModel: string | null = null;
  selectedCar: string | null = null;
  loggedIn = false;
  username: string | null = null;

  @Output() modelSelected = new EventEmitter<string>();
  @Output() variantSelected = new EventEmitter<string>();
  // Emit variant selection

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.fetchMenuData();
    this.authService.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });

    // Subscribe to user data
    this.authService.user$.subscribe((user) => {
      this.username = user;
    });
  }

  returnToHome() {
    console.log('Navigating to home...');
    this.router.navigate(['/']);
  }

  fetchMenuData(): void {
    this.categoryService.getAllCars().subscribe(
      (data: any[]) => {
        this.menuItems = [];

        data.forEach((category) => {
          const parentItem: any = {
            text: category.newCarName,
            items: [],
          };

          category.categories.forEach((subCategory: any) => {
            const subItem: any = {
              text: subCategory.carCategory,
              items: [], // Will be filled with models later
            };

            // Fetch detailed data by ID for each main category
            this.categoryService.getdataById(category.newCarId).subscribe(
              (detailed: any) => {
                // Find the same subCategory to get make/model
                const matchedCategory = detailed.categories.find(
                  (c: any) => c.carCategory === subCategory.carCategory
                );

                if (matchedCategory && matchedCategory.make) {
                  matchedCategory.make.forEach((makeItem: any) => {
                    makeItem.model.forEach((modelItem: any) => {
                      subItem.items.push({ text: modelItem.modelName });
                    });
                  });

                  // Optionally add "All Electric Cars" like link
                  subItem.items.push({
                    text: `All ${subCategory.carCategory}`,
                  });
                }
              },
              (error) => {
                console.error(
                  `Error fetching details for ID ${category.newCarId}`,
                  error
                );
              }
            );

            parentItem.items.push(subItem);
          });

          this.menuItems.push(parentItem);
        });
      },
      (error) => {
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

  onUsedCarMenuSelect(event: MenuEventArgs) {
    const selected = event.item?.text?.trim().toLowerCase();
    if (selected === 'buy-used-car') {
      console.log('Navigating to /buy-used-car');
      this.router.navigate(['/buy-used-car']);
    }
  }

  onMenuItemClick(args: MenuEventArgs): void {
    const selectedItem = args.item;
    const modelName = selectedItem.text?.trim();
    if (!modelName) return;

    const normalized = modelName.toLowerCase();
    console.log('Selected Item:', modelName);

    // ✅ Handle Used Cars Navigation
    if (
      normalized === 'buy used car' ||
      normalized === 'all buy used car' ||
      normalized === 'buy-used-car'
    ) {
      console.log('Navigating to /buy-used-car');
      this.router.navigate(['/buy-used-car']);
      return;
    }

    if (normalized === 'sell my car' || normalized === 'all sell my car') {
  console.log('Navigating to /sell-my-car');
  this.router.navigate(['/sell-my-car']);
  return;
}


    // ✅ Handle Explore New Cars
    if (normalized === 'all explore new cars') {
      console.log('Navigating to /explore-new-car');
      this.router.navigate(['/explore-new-car']);
      return;
    }

    // ✅ Handle model (only when no sub-items)
    if (!selectedItem.items || selectedItem.items.length === 0) {
      console.log('Navigating to /model/', modelName);
      this.router.navigate(['/model', modelName]);
    }

     if (normalized === 'sell my car') {
    console.log('Navigating to /sell-my-car');
    this.router.navigate(['/sell-my-car']);
    return;
  }
  }

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

  //  ---------------------------------------otp login-------------------------------------

  showLoginDialog = false;

  openLoginDialog() {
    this.showLoginDialog = true;
  }

  closeLoginDialog() {
    this.showLoginDialog = false;
  }

  // logout() {
  //   this.authService.logout();
  // }]

  logout() {
    this.authService.setLoggedIn(false);
    this.authService.setUser(null);
    this.showLoginDialog = false;
    this.router.navigate(['/home']);
  }
}
