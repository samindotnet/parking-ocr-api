import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParkingSessionPage } from './parking-session.page';

describe('ParkingSessionPage', () => {
  let component: ParkingSessionPage;
  let fixture: ComponentFixture<ParkingSessionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
