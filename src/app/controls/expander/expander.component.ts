import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-expander',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatSelectModule, CommonModule],
  templateUrl: './expander.component.html',
  styleUrl: './expander.component.scss'
})

export class ExpanderComponent
{
  @Input() uppercaseEnabled: boolean = false;
  @Input() title: string = "";
  @Input() itemsSource: Array<{id: number, name: string, isChecked:boolean}>;
  @Input() selectedItem: {id: number, name: string, isChecked:boolean};
  @Input() isExpanded: boolean = false;
  
  @Output() selectedItemChanged = new EventEmitter<any>();
  @Output() expandedChanged = new EventEmitter<boolean>();

  onItemClick(id:number)
  {
    let item = this.itemsSource.find(it => it.id == id);
    item.isChecked = true;
    this.selectedItem = item;
    this.isExpanded = false;

    this.selectedItemChanged.emit(this.selectedItem);
  }

  onExpandClick()
  {
    this.isExpanded = !this.isExpanded;
    this.expandedChanged.emit(this.isExpanded);
  }
}
