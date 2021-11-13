import {Injectable} from '@angular/core';
import {Camera, CameraResultType, Photo} from '@capacitor/camera';
import {IPhoto} from "../models/photo";
import {Capacitor} from "@capacitor/core";
import {Directory, Filesystem} from "@capacitor/filesystem";
import {Storage} from "@capacitor/storage";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private static readonly keyPhotoStorage = 'photos';
  photos: IPhoto[] = [];

  constructor() {
  }

  private static async savePictureAsync(photo: Photo): Promise<IPhoto> {
    const photoBase64String: string = await PhotoService.readAsBase64(photo);
    const fileName: string = new Date().getTime() + '.jpeg';

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: photoBase64String,
      directory: Directory.Data
    });
    console.log('saved: ', JSON.stringify(savedFile));
    const converted = Capacitor.convertFileSrc(savedFile.uri);
    console.log('converted: ', converted);
    if (Capacitor.isNativePlatform()) {
      return {
        filepath: savedFile.uri,
        webviewPath: converted
      };
    } else {
      return {
        filepath: fileName,
        webviewPath: photo.webPath
      };

    }

  }

  private static async readAsBase64(photo: Photo): Promise<string> {
    if (Capacitor.isNativePlatform()) {
      const file = await Filesystem.readFile({
        path: photo.path
      });
      return file.data;
    } else {
      const response: Response = await fetch(photo.webPath);
      const blob: Blob = await response.blob();
      return PhotoService.convertBlobToBase64(blob);
    }

  }


  private static async convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  }


  async captureImageAsync() {
    const photo: Photo = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });
    // console.log('Camera.getPhoto :', JSON.stringify(photo));

    // Save photo
    const imageFile: IPhoto = await PhotoService.savePictureAsync(photo);

    // Update local array
    // await this.loadSavedAsync();
    this.photos.unshift(imageFile);

    // Save information to storage
    await Storage.set({
      key: PhotoService.keyPhotoStorage,
      value: JSON.stringify(this.photos)
    });

  }

  async loadSavedAsync() {
    const {value} = await Storage.get({
      key: PhotoService.keyPhotoStorage
    });
    this.photos = value ? JSON.parse(value) : [];
    if (!Capacitor.isNativePlatform()) {
      this.photos = await Promise.all(
        this.photos.map(async photo => {
          const {data} = await Filesystem.readFile({
            path: photo.filepath,
            directory: Directory.Data
          });
          return {
            ...photo,
            webviewPath: `data:image/jpeg;base64,${data}`
          };
        }) // this.photos.map
      );
    }
  }

  async deletePhotoAsync(photo: IPhoto, position: number) {
    this.photos.splice(position, 1);


    console.log('photo: ', JSON.stringify(photo));
    const fileName = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    console.log('fileName: ', fileName);

    return Promise.all([
      Filesystem.deleteFile({
        path: fileName,
        directory: Directory.Data
      }),
      Storage.set({
        key: PhotoService.keyPhotoStorage,
        value: JSON.stringify(this.photos)
      })
    ]);
  }

}
