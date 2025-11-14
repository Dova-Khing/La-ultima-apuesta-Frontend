import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="wrapper">
      <div class="sidebar-container">
        <app-sidebar></app-sidebar>
      </div>

      <div class="main-panel">
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .wrapper {
    display: flex;
    min-height: 100vh;
  }

  .sidebar-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    width: 250px;
  }

  .main-panel {
    flex: 1;
    margin-left: 250px;
    background: #f8f9fa;
    min-height: 100vh;
  }

  .content {
    padding: 0;
  }

  @media (max-width: 991px) {
    .sidebar-container {
      transform: translateX(-250px);
      transition: transform 0.3s ease;
    }

    .sidebar-container.show {
      transform: translateX(0);
    }

    .main-panel {
      margin-left: 0;
    }
  }
`]
})
export class MainLayoutComponent {}