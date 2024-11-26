import {Component} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {TranslateModule } from "@ngx-translate/core";
import {MatExpansionModule} from '@angular/material/expansion';
import {ExpanderComponent} from '../controls/expander/expander.component';
import {LangService} from '../services/lang.service';
import {ThemeService} from '../services/theme.service';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatListModule, MatIconModule, CommonModule, MatSelectModule, TranslateModule,MatExpansionModule, ExpanderComponent],
  providers:[LangService, ThemeService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})

export class MainComponent {

  langService = new LangService();
  themeService = new ThemeService();

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

  // private languageEffect = effect(() =>
  // {
  //   console.log(`Language is: ${this.langExpanded()}`);
  // });

  // private layoutEffect = effect(() =>
  // {
  //   console.log(`Layout is: ${this.layoutExpanded()}`);
  // });

  // private oddEffect = effect(() =>
  // {
  //   console.log(`Odd is: ${this.oddExpanded()}`);
  // });

  // private themeEffect = effect(() =>
  // {
  //   console.log(`Theme is: ${this.themeExpanded()}`);
  // });

  ngOnInit()
  {
    let l = this.langService.getLang();
    let t = this.themeService.getTheme();

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

  onLangChanged(item: any)
  {
    var current = this.langs.find(it => it.id == item.id);
    this.langService.changeLang(current.name);
  }

  onThemeChanged(item: any)
  {
    this.themeService.changeTheme(item.name);
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
