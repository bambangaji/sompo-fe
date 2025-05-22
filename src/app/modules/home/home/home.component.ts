import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ICat } from '../../../data/cat.interfacel';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../services/modal/modal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  page: number = 0;
  size: number = 10;
  isLoading: boolean = false;
  hasMore: boolean = true;
  showModal: boolean = false;
  idDelete = "";
  defaultImage = 'assets/images/cat-not-found.jpg';
  constructor(private apiService: ApiService, private modalService: ModalService) {

  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.isLoading || !this.hasMore) return;

    // Check if we're near bottom of the page
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
      this.loadMore();
    }
  }

  listCat: ICat[] = [];
  ngOnInit(): void {
    this.fetchData();
  }

  handleImageError(event: Event, cat: any) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultImage;
    imgElement.alt = 'Default cat image';
    imgElement.style.objectFit = 'cover';

    imgElement.style.width = cat.width ? `${cat.width}px` : '100%';
    imgElement.style.height = cat.height ? `${cat.height}px` : 'auto';
  }
  fetchData(): void {
    this.apiService.getAllImages(this.page, this.size).subscribe({
      next: (response) => {
        this.listCat = response.cats || [];
      },
      error: (err) => {
        console.error('Error fetching cats:', err);
        this.listCat = [];
      }
    });
  }

  loadMore(): void {
    this.page++;
    this.isLoading = true;

    this.apiService.getAllImages(this.page, this.size).subscribe({
      next: (response) => {
        this.listCat = [...this.listCat, ...(response.cats || [])];
        this.hasMore = response.totalItems > this.listCat.length;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading more cats:', err);
        this.page--; // Revert page increment on error
        this.isLoading = false;
      }
    });
  }
  openModal(id: string) {
    this.showModal = true;
    this.idDelete = id;
  }

  closeModal() {
    this.showModal = false;
  }

  confirmDelete(): void {
    this.apiService.deleteImage(this.idDelete).subscribe({
      next: (response) => {
        this.modalService.showMessage(response);
        location.reload();
      },
      error: (err) => {
        console.error('Error fetching cats:', err);
        this.listCat = [];
      },
      complete: () => this.closeModal()
    });
  }
}
