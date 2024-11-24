import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class AppValidationComponent {
  @Input() control: AbstractControl | null = null;
  @Input() label: string = '';
  @Input() submitted: boolean = false;

  shouldShowErrors(): boolean {
    return !!this.control?.errors && (this.control.dirty || this.control.touched || this.submitted);
  }

  getErrorMessage(): string {
    if (this.control?.hasError('required')) {
      return `${this.label} is required.`;
    } else if (this.control?.hasError('min')) {
      return `${this.label} must be atleast 1.`;
    } else if (this.control?.hasError('max')) {
      return `${this.label} must be less than 1000.`;
    }
    return '';
  }
}
