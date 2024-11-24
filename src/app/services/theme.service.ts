import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  init()
  {
    var theme = this.getTheme();
      if (theme != null)
      {
        document.body.classList.remove('light-theme');
        document.body.classList.remove('dark-theme');
        document.body.classList.add(theme);
      }
  }

  changeTheme(theme: string)
  {
    theme = theme.toLowerCase()  + '-theme';

    if (document.body.classList.contains('light-theme'))
      document.body.classList.remove('light-theme');

    if (document.body.classList.contains('dark-theme'))
      document.body.classList.remove('dark-theme');

    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }

  getTheme() : string
  {
    let l = localStorage.getItem('theme');

    return l;
  }
}
