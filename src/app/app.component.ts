import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/component/navbar/navbar/navbar.component';
import { ModalComponent } from './shared/component/modal/modal/modal.component';
import { ModalService } from './services/modal/modal.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NavbarComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('messageModal') messageModal!: ModalComponent;
  title = 'sompo-fe';

  constructor(private messageModalService: ModalService) { }

  ngAfterViewInit() {
    this.messageModalService.register(this.messageModal);
  }
}
