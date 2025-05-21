import { Component, inject } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    @if (toast.message()) {
    <div
      class="fixed bottom-6 left-6 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50"
    >
      {{ toast.message() }}
    </div>
    }
  `,
})
export class ToastComponent {
  toast = inject(ToastService);
}
