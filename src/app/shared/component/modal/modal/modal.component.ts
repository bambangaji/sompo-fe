import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  show = false;
  message = '';

  open(message: string) {
    this.message = message;
    this.show = true;
  }

  close() {
    this.show = false;
  }
}
