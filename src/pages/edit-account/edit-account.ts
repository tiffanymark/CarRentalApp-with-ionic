import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, MenuController, Events, ActionSheetController, Platform, ToastController } from 'ionic-angular';
import { LocalStorage } from '../../providers/local-storage';
import { Database } from '../../providers/database';
import { Camera, File, FilePath } from 'ionic-native';

declare var cordova: any;

@Component({
  selector: 'page-edit-account',
  templateUrl: 'edit-account.html'
})
export class EditAccount {

  users: Array<{
    firstname: string,
    lastname: string,
    address: string,
    phone: string,
    birthday: string,
    email: string,
    username: string
  }>;

  id: any;

  public mask: Array<string | RegExp>

  lastImage: string = null;

  photoPath: string;
  defaultPhotoPath: string = "assets/img/avatar.jpg";
  actualPhotoPath: string;
  photoExistence: Boolean;
  newPhotoPath: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public menuCtrl: MenuController, public events: Events, private localStorage : LocalStorage, private database: Database, public actionSheetCtrl: ActionSheetController, public  platform: Platform, public toastCtrl: ToastController) {
    this.menuCtrl.enable(false, "logon");

    this.mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    this.localStorage.getUserId().then((data) => {
      this.id = data;
      this.database.searchUser(data).then((data)=>{
        this.users = [{
          firstname: data.firstname,
          lastname: data.lastname,
          address: data.address,
          phone: data.phone,
          birthday: data.birthday,
          email: data.email,
          username: data.username
        }]
        this.verifyPhotoExistence();
      });
    });

  }

  dismiss(){
    this.menuCtrl.enable(true, "logon");
    this.viewCtrl.dismiss();
  }

  save(){
    this.menuCtrl.enable(true, "logon");

    if(this.users[0].phone.toString().length > 15){
      this.users[0].phone = this.users[0].phone.slice(0,15);
    }
    this.database.updateUserAccount(this.users[0].address, this.users[0].phone, this.users[0].email,this.id).then((data) => {
      console.log("UPDATED USER ACCOUNT");
    });

    this.database.editProfilePhoto(this.newPhotoPath,this.id).then((data) => {
      console.log("SAVED NEW PHOTO ", data);
    });
    
    
    this.events.publish('reloadProfile');
    this.navCtrl.pop();
  }

  chooseProfilePhoto() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Change profile photo',
      buttons: [
        {
          text: 'Remove Photo',
          role: 'destructive',
          handler: () => {
            this.newPhotoPath = null;
            this.lastImage = null;
            this.photoExistence = null;
          }
        },
        {
          text: 'Take Photo',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Choose from Library',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    var options = {
      quality: 50,
      targetWidth: 300,
      targetHeight: 300,
      allowEdit: true,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
 
    Camera.getPicture(options).then((imagePath) => {
      if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
        FilePath.resolveNativePath(imagePath)
        .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDirectory(correctPath, currentName, this.createFileName());
        });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDirectory(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      console.error("Error while choosing photo: ", err);
    });
  }

  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
  
  private copyFileToLocalDirectory(namePath, currentName, newFileName) {
    File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
  
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  
  pathForImage(img) {
    if(img != null){
      this.newPhotoPath = cordova.file.dataDirectory + img;
      return cordova.file.dataDirectory + img;
    }
    else if(this.photoExistence == true) {
      this.newPhotoPath = this.actualPhotoPath;
      return this.actualPhotoPath;
    } 
    else if(this.photoExistence == false){
      return this.defaultPhotoPath;
    }
    else if(img == null){
      return this.defaultPhotoPath;
    }
  }

  verifyPhotoExistence(){
    this.database.searchUser(this.id).then((data) => {
      if(data == null){
        this.lastImage = null;
        this.photoExistence = false;
      }
      else{
        this.actualPhotoPath = data.photo;
        this.photoExistence = true;
      }
    });
  }

}
