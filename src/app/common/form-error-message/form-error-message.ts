import { Component, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Component({
  imports: [],
  selector: 'app-form-error-message',
  styleUrl: './form-error-message.css',
  templateUrl: './form-error-message.html',
})
export class FormErrorMessage {
  campo = input.required<FieldState<unknown>>()
}
