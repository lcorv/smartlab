import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaOperatoreComponent } from './modifica-operatore.component';

describe('ModificaOperatoreComponent', () => {
  let component: ModificaOperatoreComponent;
  let fixture: ComponentFixture<ModificaOperatoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificaOperatoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificaOperatoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
