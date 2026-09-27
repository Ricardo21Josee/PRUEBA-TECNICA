import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class ToastService {
  success(title: string, text?: string): void {
    Swal.fire({
      icon: 'success',
      title,
      text,
      timer: 1800,
      showConfirmButton: false,
    });
  }

  error(title: string, text?: string): void {
    Swal.fire({
      icon: 'error',
      title,
      text,
    });
  }

  async confirm(title: string, text: string): Promise<boolean> {
    const result = await Swal.fire({
      icon: 'warning',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
    });
    return result.isConfirmed;
  }

  info(title: string, text?: string): void {
    Swal.fire({ icon: 'info', title, text });
  }

  extractErrorMessage(err: unknown, fallback = 'Ocurrió un error'): string {
    const e = err as { error?: { message?: string | string[] } };
    const msg = e?.error?.message;
    if (Array.isArray(msg)) return msg.join(', ');
    if (typeof msg === 'string') return msg;
    return fallback;
  }
}