import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestisciOrariComponent } from './gestisci-orari.component';

describe('GestisciOrariComponent', () => {
  let component: GestisciOrariComponent;
  let fixture: ComponentFixture<GestisciOrariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestisciOrariComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestisciOrariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
