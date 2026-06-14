import { Component, effect, ElementRef, inject, input, viewChild } from '@angular/core';
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
export class MemberMessagesComponent {
  messageForm = viewChild<NgForm>('messageForm');
  scrollContainer = viewChild<ElementRef<HTMLUListElement>>('scrollMe');
  messageService = inject(MessageService)
  username = input.required<string>();
  messageContent = '';
  private previousMessageCount = 0;

  constructor() {
    effect(() => {
      const messageCount = this.messageService.messageThread().length;

      if (messageCount === this.previousMessageCount) return;
      
      this.previousMessageCount = messageCount;
      setTimeout(() => this.scrollToBottom());
    });
  }

  sendMessage() {
    this.messageService.sendMessage(this.username(), this.messageContent).then(() => {
      this.messageForm()?.reset();
    })
  }

  private scrollToBottom() {
    const scrollContainer = this.scrollContainer();
    if (scrollContainer) {
      scrollContainer.nativeElement.scrollTop = scrollContainer.nativeElement.scrollHeight;
    }
  }
}
