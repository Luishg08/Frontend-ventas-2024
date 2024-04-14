import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPublicoComponent } from './registro-publico.component';

describe('RegistroPublicoComponent', () => {
  let component: RegistroPublicoComponent;
  let fixture: ComponentFixture<RegistroPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroPublicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
