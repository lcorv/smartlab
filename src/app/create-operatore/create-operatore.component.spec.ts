import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOperatoreComponent } from './create-operatore.component';

describe('CreateOperatoreComponent', () => {
  let component: CreateOperatoreComponent;
  let fixture: ComponentFixture<CreateOperatoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOperatoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOperatoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
