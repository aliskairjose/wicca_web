import { Pipe, PipeTransform } from '@angular/core';
import { UserInterface } from 'src/app/pages/dashboard/users/user.interface';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(users: UserInterface[], query: string): UserInterface[] {
    query = query.trim().toLowerCase();
    if(!query) return users;
    return users.filter(user => {
      return user.name.toLowerCase().includes(query.toLowerCase()) ||
       user.lastName.toLowerCase().includes(query.toLowerCase()) ||
       user.email.toLowerCase().includes(query.toLowerCase());
    });
  }

}
