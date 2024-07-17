import { AfterViewChecked, Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { MessageService } from '../../_services/message.service';
import { TimeagoModule } from 'ngx-timeago';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [TimeagoModule, FormsModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements AfterViewChecked {
  messageForm = viewChild<NgForm>('messageForm');
  scrollContainer = viewChild<ElementRef<HTMLUListElement>>('scrollMe');
  messageService = inject(MessageService)
  username = input.required<string>();
  messageContent = '';

  sendMessage() {
    this.messageService.sendMessage(this.username(), this.messageContent).then(() => {
      this.messageForm()?.reset();
      this.scrollToBottom();
    })
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    const scrollContainer = this.scrollContainer();
    if (scrollContainer) {
      scrollContainer.nativeElement.scrollTop = scrollContainer.nativeElement.scrollHeight;
    }
  }
}
