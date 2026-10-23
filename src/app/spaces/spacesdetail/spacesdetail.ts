import { Component, inject, input } from '@angular/core';
import { Spaceservice } from '../spaceservice';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-spacesdetail',
  styleUrl: './spacesdetail.css',
  templateUrl: './spacesdetail.html',
})
export class Spacesdetail {
  readonly service = inject(Spaceservice)
  readonly id = input.required<string>();
  protected readonly space = this.service.getById(this.id);
}
