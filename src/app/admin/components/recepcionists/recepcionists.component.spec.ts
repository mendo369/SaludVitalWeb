import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionistsComponent } from './recepcionists.component';

describe('RecepcionistsComponent', () => {
  let component: RecepcionistsComponent;
  let fixture: ComponentFixture<RecepcionistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepcionistsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
