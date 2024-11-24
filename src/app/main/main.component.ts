import {Component, inject } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {TranslateService, TranslateModule } from "@ngx-translate/core";
import {MatExpansionModule} from '@angular/material/expansion';
import {ExpanderComponent} from '../controls/expander/expander.component';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatListModule, MatIconModule, CommonModule, MatSelectModule, TranslateModule,MatExpansionModule, ExpanderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})

export class MainComponent {
  translate: TranslateService = inject(TranslateService);

  langs = [  {id: 1, name: 'en', isChecked: false }, {id: 2, name: 'ka', isChecked: false } ];
  selectedLang: {id: number, name: string, isChecked:boolean};
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

  onLangChanged(item: any)
  {
    var current = this.langs.find(item => item.id == item.id);
    this.translate.use(current.name.toLowerCase());
    if (localStorage != undefined)
      localStorage.setItem('lang', current.name.toLowerCase());
  }

  ngOnInit()
  {
    let l = localStorage.getItem('lang');
    let t = localStorage.getItem('theme');

    this.selectedLayout = this.layouts[1];
    this.selectedodd = this.odds[0];
    this.selectedTheme = this.themes[0];

    let current = this.langs.find(lang => lang.name == l);
    this.selectedLang = current;
    current.isChecked = true;

    let theme = this.themes.find(te => te.name.toLowerCase() + '-theme' == t);
    this.selectedTheme = theme;
    theme.isChecked = true;
  }

  onThemeChanged(item: any)
  {
    this.selectedTheme = item;
    this.themeExpanded = false;

    this.changeTheme(item.name.toLowerCase() + '-theme');
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

  changeExpanded(name: string, expanded: boolean)
  {
    switch(name)
    {
      case 'Languages':
        this.langExpanded = expanded;
        if (expanded)
        {
          this.layoutExpanded = false;
          this.oddExpanded = false;
          this.themeExpanded = false;
        }
        break;
      case 'Layout':
        if (expanded)
        {
          this.langExpanded = false;
          this.oddExpanded = false;
          this.themeExpanded = false;
        }
        this.layoutExpanded = expanded;
        break;
      case 'Odds':
        if (expanded)
        {
          this.langExpanded = false;
          this.layoutExpanded = false;
          this.themeExpanded = false;
        }
        this.oddExpanded = expanded;
        break;
      case 'Theme':
        if (expanded)
        {
          this.langExpanded = false;
          this.layoutExpanded = false;
          this.oddExpanded = false;
        }
        this.themeExpanded = expanded;
        break;
    }
  }

  expLang(expanded: boolean)
  {
    this.changeExpanded('Languages', expanded);
  }

  expLayout(expanded: boolean)
  {
    this.changeExpanded('Layout', expanded);
  }

  expOdd(expanded: boolean)
  {
    this.changeExpanded('Odds', expanded);
  }

  expTheme(expanded: boolean)
  {
    this.changeExpanded('Theme', expanded);
  }
}
