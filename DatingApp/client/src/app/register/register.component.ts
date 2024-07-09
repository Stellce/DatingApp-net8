import { Component, inject, input, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  cancelRegister = output<boolean>();

  register(f: NgForm) {
    console.log(f.form.value);
    this.accountService.register(f.form.value).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => console.log(error)
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
