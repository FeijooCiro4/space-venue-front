import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Spaceslist } from './spaceslist';

describe('Spaceslist', () => {
  let component: Spaceslist;
  let fixture: ComponentFixture<Spaceslist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Spaceslist],
    }).compileComponents();

    fixture = TestBed.createComponent(Spaceslist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
