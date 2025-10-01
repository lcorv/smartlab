import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestisciAvvisiComponent } from './gestisci-avvisi.component';

describe('GestisciAvvisiComponent', () => {
  let component: GestisciAvvisiComponent;
  let fixture: ComponentFixture<GestisciAvvisiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestisciAvvisiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestisciAvvisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
