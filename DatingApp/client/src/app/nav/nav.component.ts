import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService);
  model: any = {};

  login(f: NgForm) {
    console.log(f.form.value);
    this.accountService.login(f.form.value).subscribe({
      next: response => {
        console.log(response);
        f.reset();
      },
      error: err => console.log(err)
    }); 
  }

  logout() {
    this.accountService.logout();
  }
}
