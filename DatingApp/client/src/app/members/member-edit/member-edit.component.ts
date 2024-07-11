import { Component, HostListener, inject, OnInit, viewChild } from '@angular/core';
import { Member } from '../../_models/member.model';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, FormsModule, AsyncPipe],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit{
  editForm = viewChild.required<NgForm>('editForm');
  @HostListener("window:beforeunload", ['$event']) notify($event:any) {
    if(this.editForm()?.dirty) {
      $event.returnValue = true;
    }
  }
  member?: Member;
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const user = this.accountService.user();
    if(!user) return;
    this.memberService.getMember(user.username).subscribe({
      next: member => this.member = member
    })
  }

  updateMember(editForm: NgForm) {
    this.memberService.updateMember(editForm.form.value).subscribe({
      next: _ => {
      this.toastr.success('Profile updated successfully');
      this.editForm()?.reset(this.member);
      }
    });
    
     
  }
}
