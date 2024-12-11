import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddanimalComponent } from './addanimal.component';

describe('AddanimalComponent', () => {
  let component: AddanimalComponent;
  let fixture: ComponentFixture<AddanimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddanimalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddanimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
