import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  login(f: NgForm) {
    console.log(f.form.value);
    this.accountService.login(f.form.value).subscribe({
      next: _ => {
        this.router.navigateByUrl("/members");
        f.reset();
      },
      error: err => this.toastr.error(err.error)
    }); 
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
}
