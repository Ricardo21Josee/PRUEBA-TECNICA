import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  template: `
    <div class="layout">
      <app-navbar></app-navbar>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .layout {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background: #f4f6f9;
      }
      .content {
        flex: 1;
        padding: 24px;
        max-width: 1280px;
        width: 100%;
        margin: 0 auto;
      }
    `,
  ],
})
export class LayoutComponent {}