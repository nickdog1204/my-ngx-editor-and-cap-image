import {Component, OnInit} from '@angular/core';
import {PhotoService} from "../../../common/services/photo.service";
import {IPhoto} from "../../../common/models/photo";
import {ActionSheetController, ModalController} from "@ionic/angular";
import {ImageZoomModalComponent} from "../../../modules/shared/components/image-zoom-modal/image-zoom-modal.component";
import SwiperCore, { Zoom, Navigation, Pagination } from "swiper";

SwiperCore.use([Zoom, Navigation, Pagination]);


@Component({
  selector: 'app-recent',
  templateUrl: './recent.page.html',
  styleUrls: ['./recent.page.scss'],
})
export class RecentPage implements OnInit {
  photoList: IPhoto[] = [];

  constructor(
    private photoService: PhotoService,
    private modalController: ModalController,
  ) {
  }

  async ngOnInit() {
    await this.photoService.loadSavedAsync();
    this.photoList = this.photoService.photos;
  }


  async captureImageAsync() {
    this.photoService.captureImageAsync();
  }

  async openPreview(photo: IPhoto, idx: number) {
    const modalEl = await this.modalController.create({
      component: ImageZoomModalComponent,
      componentProps: {
        photo,
        idx
      },
      cssClass: 'transparent-modal'
    });

    await modalEl.present();

  }

}
