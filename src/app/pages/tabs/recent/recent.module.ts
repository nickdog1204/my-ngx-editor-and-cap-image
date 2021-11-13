import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentPageRoutingModule } from './recent-routing.module';

import { RecentPage } from './recent.page';
import {SharedModule} from "../../../modules/shared/shared.module";


@NgModule({
  imports: [
    SharedModule,
    RecentPageRoutingModule
  ],
  declarations: [RecentPage]
})
export class RecentPageModule {}
