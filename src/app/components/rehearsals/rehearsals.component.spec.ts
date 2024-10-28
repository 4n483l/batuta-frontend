import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RehearsalsComponent } from './rehearsals.component';

describe('RehearsalsComponent', () => {
  let component: RehearsalsComponent;
  let fixture: ComponentFixture<RehearsalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RehearsalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RehearsalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
