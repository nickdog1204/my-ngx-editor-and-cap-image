import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit} from '@angular/core';
import {CustomOption} from "ngx-quill";
import {Editor, schema, toHTML, toDoc, Toolbar} from "ngx-editor";
import * as fromNgx from 'ngx-editor'
import {Plugin, PluginKey} from 'prosemirror-state';
import {AlertController} from "@ionic/angular";
import {ImageViewComponent} from "ngx-editor/lib/components/image-view/image-view.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {
  myhtml = '';
  srcInput: any;
  imgInsertBtn: HTMLElement;


  editor: Editor;

  set html(val: string) {
    this.myhtml = val;
    console.log(this.myhtml);
  }

  constructor(
    private elementRef: ElementRef,
    private alertController: AlertController,
  ) {
  }

  ngAfterViewInit(): void {
    // const element = this.elementRef.nativeElement.querySelector('ngx-image svg');
    //
    // element.addEventListener('click', async () => {
    //   this.srcInput = this.elementRef.nativeElement.querySelector('ngx-image input');
    //   this.imgInsertBtn = <HTMLElement>this.elementRef.nativeElement.querySelector('ngx-image button[type="submit"]');
    //   this.imgInsertBtn.removeAttribute('disabled');
    //   const alertEl = await this.alertController.create({
    //     header: '輸入',
    //     message: '輸入圖片位置',
    //     buttons: ['ok']
    //   });
    //   await alertEl.present();
    //   console.log(this.imgInsertBtn);
    //   this.imgInsertBtn.click();
    //   await alertEl.onDidDismiss();
    // });
    // console.log(element);
  }


  ngOnInit(): void {
    this.editor = new Editor({
      content: 'good',

    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  btnClicked() {
    this.editor.commands.insertImage('https://i.imgur.com/SKigZSK.jpg').exec();

  }


}
