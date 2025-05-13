import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellMyCarComponent } from './sell-my-car.component';

describe('SellMyCarComponent', () => {
  let component: SellMyCarComponent;
  let fixture: ComponentFixture<SellMyCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellMyCarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellMyCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
