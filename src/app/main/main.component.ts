import { Component, inject, Input } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatListModule, MatIconModule, CommonModule, MatSelectModule, TranslateModule,MatExpansionModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})

export class MainComponent {
  translate: TranslateService = inject(TranslateService);

  langs = [  {id: 1, name: 'en', isChecked: false }, {id: 2, name: 'ka', isChecked: false } ];
  selectedLang: any;
  langExpanded: boolean = false;

  layouts = [  {id: 1, name: 'Asian', isChecked: false }, {id: 2, name: 'European', isChecked: true } ];
  selectedLayout: any;
  layoutExpanded: boolean = false;

  odds = [  {id: 1, name: 'Decimal', isChecked: true }, {id: 2, name: 'Fraction', isChecked: false }, {id: 3, name: 'American', isChecked: false } ];
  selectedodd: any;
  oddExpanded: boolean = false;

  themes = [  {id: 1, name: 'Dark', isChecked: false }, {id: 2, name: 'Light', isChecked: false } ];
  selectedTheme: any;
  themeExpanded: boolean = false;

  ngOnInit() {
    let l = localStorage.getItem('lang');
    let t = localStorage.getItem('theme');

    this.selectedLayout = this.layouts[1];
    this.selectedodd = this.odds[0];
    this.selectedTheme = this.themes[0];

    this.langs.forEach(lang => {
      if (lang.name == l)
      {
        this.selectedLang = lang;
        lang.isChecked = true;
      }
    });

    this.themes.forEach(item => {
      if (item.name.toLowerCase() + '-theme' == t)
      {
        this.selectedTheme = item;
        item.isChecked = true;
      }
    });
  }

  langChanged(id:number)
  {
    this.langs.forEach(item => {
      item.isChecked = item.id == id;
        if (item.isChecked)
        {
          this.selectedLang = item;
          this.changeLang(item.name.toLowerCase());
          this.langExpanded = false;
        }
    });
  }

  changeLang(lang: string)
  {
    this.translate.use(lang);
    if (localStorage != undefined)
      localStorage.setItem('lang', lang);
  }

  layoutChanged(id:number)
  {
    this.layouts.forEach(item => {
      item.isChecked = item.id == id;
      if (item.isChecked)
      {
        this.selectedLayout = item;
        this.layoutExpanded = false;
      }
  });
  }

  oddChanged(id:number)
  {
    this.odds.forEach(item => {
      item.isChecked = item.id == id;
      if (item.isChecked)
      {
        this.selectedodd = item;
        this.oddExpanded = false;
      }
  });
  }

  themeChanged(id:number)
  {
    this.themes.forEach(item => {
      item.isChecked = item.id == id;
      if (item.isChecked)
      {
        this.selectedTheme = item;
        this.themeExpanded = false;

        this.changeTheme(item.name.toLowerCase() + '-theme');
      }
  });
  }

  changeTheme(name: string)
  {
    if (document.body.classList.contains('light-theme'))
      document.body.classList.remove('light-theme');

    if (document.body.classList.contains('dark-theme'))
      document.body.classList.remove('dark-theme');

    document.body.classList.add(name);
    localStorage.setItem('theme', name);
  }
}
