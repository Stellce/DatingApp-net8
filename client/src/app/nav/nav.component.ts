import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HasRoleDirective } from '../_directives/has-role.directive';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive, HasRoleDirective],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService);
  private router = inject(Router);

  login(f: NgForm) {
    this.accountService.login(f.form.value).subscribe({
      next: _ => {
        this.router.navigateByUrl("/members");
        f.reset();
      }
    }); 
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
}
