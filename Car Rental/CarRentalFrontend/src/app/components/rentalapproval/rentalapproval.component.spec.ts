import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalapprovalComponent } from './rentalapproval.component';

describe('RentalapprovalComponent', () => {
  let component: RentalapprovalComponent;
  let fixture: ComponentFixture<RentalapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalapprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
