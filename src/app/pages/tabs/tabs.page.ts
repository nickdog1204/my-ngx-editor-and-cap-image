import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {IonTabs} from "@ionic/angular";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit, AfterViewInit {
  @ViewChild('tabs')
  tabs: IonTabs;


  selectedTab;


  constructor() {
  }

  tabSelected() {
    this.selectedTab = this.tabs.getSelected();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

}
