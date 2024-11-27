import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  document = inject(DOCUMENT);
  currentTheme = signal(this.document?.defaultView?.localStorage?.getItem('theme') || 'dark-theme');

  constructor()
  {
    effect(() =>
    {
      console.log(this.currentTheme());
      if (localStorage != undefined)
      {
        if (document.body.classList.contains('light-theme'))
          document.body.classList.remove('light-theme');

        if (document.body.classList.contains('dark-theme'))
          document.body.classList.remove('dark-theme');

        document.body.classList.add(this.currentTheme());
        localStorage.setItem('theme', this.currentTheme());
      }
    });
  }
  
  init()
  {
    document.body.classList.remove('light-theme');
    document.body.classList.remove('dark-theme');
    document.body.classList.add(this.currentTheme());
  }
}
