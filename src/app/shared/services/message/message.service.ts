import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message: string = '';
  type: string = '';

  constructor() {}

  success(message: string) {
    this.message = message;
    this.type = 'success';
    setTimeout(() => {
      this.clear();
    }, 3000);
  }

  error(message: string) {
    this.message = message;
    this.type = 'danger';
    setTimeout(() => {
      this.clear();
    }, 3000);
  }

  clear() {
    this.message = '';
    this.type = '';
  }
}
