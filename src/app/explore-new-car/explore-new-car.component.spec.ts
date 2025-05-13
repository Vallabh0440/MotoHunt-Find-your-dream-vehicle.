import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreNewCarComponent } from './explore-new-car.component';

describe('ExploreNewCarComponent', () => {
  let component: ExploreNewCarComponent;
  let fixture: ComponentFixture<ExploreNewCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreNewCarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreNewCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
