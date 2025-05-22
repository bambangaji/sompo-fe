import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { ModalComponent } from '../../modal/modal/modal.component';
import { ModalService } from '../../../../services/modal/modal.service';
import { Route, Router } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  showModal = false;
  selectedFile: File | null = null;
  isLoading = false;

  constructor(private apiService: ApiService, private modalService: ModalService, private router: Router) {

  }
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedFile = null;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  goInsertData() {
    this.router.navigate(["/insert"])
  }
  onUpload() {
    if (this.selectedFile) {
      this.isLoading = true;

      this.apiService.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          if (response)
            location.reload();
        },
        error: (err) => {
          this.modalService.showMessage(err.message);
        },
        complete: () => this.isLoading = false
      });
      this.closeModal();
    }
  }
}
