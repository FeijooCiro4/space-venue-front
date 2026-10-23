import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Spacesdetail } from './spacesdetail';

describe('Spacesdetail', () => {
  let component: Spacesdetail;
  let fixture: ComponentFixture<Spacesdetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Spacesdetail],
    }).compileComponents();

    fixture = TestBed.createComponent(Spacesdetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
