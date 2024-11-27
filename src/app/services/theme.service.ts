import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  currentTheme = signal('dark-theme');

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
    this.currentTheme.set(localStorage.getItem('theme'));
    document.body.classList.remove('light-theme');
    document.body.classList.remove('dark-theme');
    document.body.classList.add(this.currentTheme());
  }
}
