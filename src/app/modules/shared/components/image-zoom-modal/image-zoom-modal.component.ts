import {Component, Input, OnInit} from '@angular/core';
import {SwiperOptions} from "swiper";
import {IPhoto} from "../../../../common/models/photo";
import {DomSanitizer} from "@angular/platform-browser";
import {ActionSheetController, ModalController} from "@ionic/angular";
import {PhotoService} from "../../../../common/services/photo.service";

@Component({
  selector: 'app-image-zoom-modal',
  templateUrl: './image-zoom-modal.component.html',
  styleUrls: ['./image-zoom-modal.component.scss'],
})
export class ImageZoomModalComponent implements OnInit {
  @Input()
  photo: IPhoto;

  @Input()
  idx: number;

  opts: SwiperOptions = {
    zoom: true
  };

  constructor(
    public sanitizer: DomSanitizer,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private photoService: PhotoService
  ) {
  }

  ngOnInit() {
    // console.log('photo:', this.photo);
  }

  closeIt() {
    this.modalController.dismiss();
  }

  async deleteAsync() {
    const alertEl = await this.actionSheetController.create({
      header: '圖片',
      buttons: [
        {
          text: '刪除',
          role: 'destructive',
          icon: 'trash'
        },
        {
          text: '取消',
          role: 'cancel',
          icon: 'close'
        }
      ]
    });
    await alertEl.present();
    const {role} = await alertEl.onDidDismiss();
    if ('destructive' === role) {
      await this.photoService.deletePhotoAsync(this.photo, this.idx);
      this.closeIt();
    }

  }

}
