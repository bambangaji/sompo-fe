import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert',
  imports: [CommonModule, FormsModule],
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.scss'
})
export class InsertComponent {
  selectedFile: File | null = null;
  name = '';
  width: number | undefined = undefined;
  height: number | undefined = undefined;
  url = '';
  isUploading = false;
  message = '';
  isSuccess = false;

  constructor(private apiService: ApiService, private router: Router) { }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  upload() {
    if (!this.name || !this.url || this.width === undefined ? false : this.width <= 0 || this.height === undefined ? false : this.height <= 0) {
      this.message = 'Please fill in all fields';
      this.isSuccess = false;
      return;
    }

    const body = {
      id: this.name,
      url: this.url,
      width: this.width,
      height: this.height
    }
    this.isUploading = true;
    this.apiService.uploadDataCat(body).subscribe({
      next: () => {
        this.router.navigate([''])
        this.isSuccess = true;
        this.isUploading = false;
        this.clearForm();
      },
      error: (err: any) => {
        console.error('Upload error:', err);
        this.message = '❌ Upload failed.';
        this.isSuccess = false;
        this.isUploading = false;
      }
    });
  }

  clearForm() {
    this.selectedFile = null;
    this.name = '';
    this.width = 0;
    this.height = 0;
    this.url = '';
  }
}
