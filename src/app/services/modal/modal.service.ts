import { Injectable } from '@angular/core';
import { ModalComponent } from '../../shared/component/modal/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {


  private modalComponent?: ModalComponent;

  register(modal: ModalComponent) {
    this.modalComponent = modal;
  }

  showMessage(message: string) {
    if (this.modalComponent) {
      this.modalComponent.open(message);
    } else {
      console.warn('MessageModalComponent not registered');
      alert(message); // fallback
    }
  }

}
