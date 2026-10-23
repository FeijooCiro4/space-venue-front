import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Spacescard } from './spacescard';

describe('Spacescard', () => {
  let component: Spacescard;
  let fixture: ComponentFixture<Spacescard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Spacescard],
    }).compileComponents();

    fixture = TestBed.createComponent(Spacescard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
