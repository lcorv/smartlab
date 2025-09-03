import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestisciOperatoriComponent } from './gestisci-operatori.component';

describe('GestisciOperatoriComponent', () => {
  let component: GestisciOperatoriComponent;
  let fixture: ComponentFixture<GestisciOperatoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestisciOperatoriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestisciOperatoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
