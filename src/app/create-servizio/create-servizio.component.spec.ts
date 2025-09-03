import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServizioComponent } from './create-servizio.component';

describe('CreateServizioComponent', () => {
  let component: CreateServizioComponent;
  let fixture: ComponentFixture<CreateServizioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateServizioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServizioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
