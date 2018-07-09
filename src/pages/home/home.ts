import { Component } from '@angular/core';
import { NavController,AlertController, Platform } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { RandomUserProvider } from '../../providers/random-user/random-user';
import { Observable } from 'rxjs/Observable';
import * as dl from 'cordova-plugin-android-downloadmanager';
import { FileOpener } from '@ionic-native/file-opener';
import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [FileTransfer, FileTransferObject, File]
})
export class HomePage {
user:Observable<any[]>;
downloadFile1:Observable<any[]>;
downloadFile:Observable<any[]>;
storageDirectory: string = '';
abc: any;
  constructor(private fileOpener: FileOpener,public platform: Platform, public alertCtrl: AlertController, public navCtrl: NavController,private transfer: FileTransfer, private file: File,public _randomUser: RandomUserProvider, public http: Http) {
    

    this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if(!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = this.file.documentsDirectory;
      }
      else if(this.platform.is('android')) {
        this.storageDirectory = this.file.externalDataDirectory;
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
    });
  }
 

  getUsers(){
   this.user = this._randomUser.loadRandomUsers();
  
    }
    
    downloadImage(id){
      
      this.file.checkFile(this.storageDirectory, id.title)
      .then(() => {
        const alertSuccess = this.alertCtrl.create({
          title: `File Already Downloaded`,
          subTitle: `${id.title} was already downloaded`,
          buttons: ['Ok']
        });
        alertSuccess.present();
      }).catch((entry)=>{
        const fileTransfer: FileTransferObject = this.transfer.create();
  
        const imageLocation = 'https://www.googleapis.com/drive/v2/files/'+id.id+'?alt=media&key=AIzaSyB1eeDqBxiKK38UNKlxBkcKyFFZFwh6RIE';
  
        fileTransfer.download(imageLocation, this.storageDirectory + id.title).then((entry) => {
  
          const alertSuccess = this.alertCtrl.create({
            title: `Download Succeeded!`,
            subTitle: `${id.title} was successfully downloaded to: ${entry.toURL()}`,
            buttons: ['Ok']
          });
  
          alertSuccess.present();
  
        }, (error) => {
  
          const alertFailure = this.alertCtrl.create({
            title: `Download Failed!`,
            subTitle: `${id.title} was not successfully downloaded. Error code: ${error.code}`,
            buttons: ['Ok']
          });
  
          alertFailure.present();
  
        });
      })
        
      }
     
  
    
    retrieveImage(id) {

      this.file.checkFile(this.storageDirectory, id.title)
        .then(() => {
  
          const alertSuccess = this.alertCtrl.create({
            title: `File retrieval Succeeded!`,
            subTitle: `${id.title} was successfully retrieved from: ${this.storageDirectory}`,
            buttons: ['Ok']
          });
  
          return alertSuccess.present();
  
        })
        .catch((err) => {
  
          const alertFailure = this.alertCtrl.create({
            title: `File retrieval Failed!`,
            subTitle: `${id.title} was not successfully retrieved. Error Code: ${err.code}`,
            buttons: ['Ok']
          });
  
          return alertFailure.present();
  
        });
    }

    playImage(id){
      this.file.checkFile(this.storageDirectory, id.title).then(()=>{
        this.fileOpener.open(this.storageDirectory + id.title, 'application/mp4' );
      }
    ).catch((err)=>{
      const alertFailure = this.alertCtrl.create({
        title: `File Playing Failed!`,
        subTitle: `${id.title} was not successfully Downloaded.`,
        buttons: ['Ok']
      });

      return alertFailure.present();

    });
    


    }
  
  }

