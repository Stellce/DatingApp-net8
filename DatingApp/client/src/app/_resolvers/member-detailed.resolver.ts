import { ResolveFn } from '@angular/router';
import { MembersService } from '../_services/members.service';
import { inject } from '@angular/core';
import { Member } from '../_models/member.model';
import { Observable } from 'rxjs';

export const memberDetailedResolver: ResolveFn<Observable<Member> | null> = (route, state) => {
  const memberService = inject (MembersService);
  
  const username = route.paramMap.get('username');

  if (!username) return null;

  return memberService.getMember(username);
};
