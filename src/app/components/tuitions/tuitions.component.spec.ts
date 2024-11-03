import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuitionsComponent } from './tuitions.component';

describe('TuitionsComponent', () => {
  let component: TuitionsComponent;
  let fixture: ComponentFixture<TuitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuitionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
