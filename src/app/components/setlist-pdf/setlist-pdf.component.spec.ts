import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetlistPdfComponent } from './setlist-pdf.component';

describe('SetlistPdfComponent', () => {
  let component: SetlistPdfComponent;
  let fixture: ComponentFixture<SetlistPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetlistPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetlistPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
