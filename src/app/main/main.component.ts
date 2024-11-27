import {Component, effect, signal} from '@angular/core';
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

  constructor(private langService: LangService, private themeService: ThemeService){}

  isExpanded: string;

  langs = [  {id: 1, name: 'en', isChecked: false }, {id: 2, name: 'ka', isChecked: false } ];
  selectedLang: any;

  layouts = [  {id: 1, name: 'Asian', isChecked: false }, {id: 2, name: 'European', isChecked: true } ];
  selectedLayout: any = this.layouts[1];

  odds = [  {id: 1, name: 'Decimal', isChecked: true }, {id: 2, name: 'Fraction', isChecked: false }, {id: 3, name: 'American', isChecked: false } ];
  selectedodd: any = this.odds[0];

  themes = [  {id: 1, name: 'Dark', isChecked: false }, {id: 2, name: 'Light', isChecked: false } ];
  selectedTheme: any;

  

  ngOnInit()
  {
    let l = localStorage?.getItem('lang');
    let current = this.langs.find(lang => lang.name == l);
    this.selectedLang = current;
    current.isChecked = true;

    let t = localStorage?.getItem('theme');
    let theme = this.themes.find(te => te.name.toLowerCase() + '-theme' == t);
    this.selectedTheme = theme;
    theme.isChecked = true;
  }

  onLangChanged(item: any)
  {
    var current = this.langs.find(it => it.id == item.id);
    this.langService.currentLang.set(current.name);
  }

  onThemeChanged(item: any)
  {
    this.themeService.currentTheme.set(item.name.toLowerCase() + '-theme');
  }

  expLang(expanded: boolean)
  {
    this.isExpanded = expanded ? 'lang' : "";
  }

  expLayout(expanded: boolean)
  {
    this.isExpanded = expanded ? 'layout' : "";
  }

  expOdd(expanded: boolean)
  {
    this.isExpanded = expanded ? 'odd' : "";
  }

  expTheme(expanded: boolean)
  {
    this.isExpanded = expanded ? 'theme' : "";
  }
}
