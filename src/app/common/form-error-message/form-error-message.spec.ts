import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormErrorMessage } from './form-error-message';

describe('FormErrorMessage', () => {
  let component: FormErrorMessage;
  let fixture: ComponentFixture<FormErrorMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormErrorMessage],
    }).compileComponents();

    fixture = TestBed.createComponent(FormErrorMessage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
