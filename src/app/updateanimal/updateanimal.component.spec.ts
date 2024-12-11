import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateanimalComponent } from './updateanimal.component';

describe('UpdateanimalComponent', () => {
  let component: UpdateanimalComponent;
  let fixture: ComponentFixture<UpdateanimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateanimalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateanimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
