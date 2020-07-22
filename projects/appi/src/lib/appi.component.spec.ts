import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppiComponent } from './appi.component';

describe('AppiComponent', () => {
  let component: AppiComponent;
  let fixture: ComponentFixture<AppiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
