import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAvvisoComponent } from './create-avviso.component';

describe('CreateAvvisoComponent', () => {
  let component: CreateAvvisoComponent;
  let fixture: ComponentFixture<CreateAvvisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAvvisoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAvvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
