import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoReportsComponent } from './do-reports.component';

describe('DoReportsComponent', () => {
  let component: DoReportsComponent;
  let fixture: ComponentFixture<DoReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
