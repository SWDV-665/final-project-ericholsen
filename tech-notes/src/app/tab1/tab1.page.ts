import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { PasswordsProviderService } from '../passwords-provider.service';
import { InputDialogServiceService } from '../input-dialog-provider.service';
/*added to enable social sharing on native device, also injected into constructor*/
import { SocialSharing } from '@ionic-native/social-sharing/ngx';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title = "Tech Notes";



  passwords = [];

  errorMessage: string;

  descending: boolean = true;
  order: number;
  column: string = 'description';
  terms: string;

  sort(){
    //this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

  constructor(public toastController: ToastController, public alertController: AlertController,public dataService: PasswordsProviderService, public inputDialogService: InputDialogServiceService, public socialSharing: SocialSharing) {
    dataService.dataChanged$.subscribe((dataChanged:boolean) => {
      this.loadPasswords();
    })
  }

  ionViewWillEnter(){
    this.loadPasswords();
    this.sort();
  }

  loadPasswords() {
    return this.dataService.getPasswords()
    .subscribe(
      passwords => this.passwords = passwords,
      error => this.errorMessage = <any>error);
  }

  async removePassword(password, index) {
    console.log("Removing Item = ", password, index);
    const toast = await this.toastController.create({
      message: 'Removing ' + password.description + '...',
      duration: 2000
    });
    toast.present();

    this.dataService.removePassword(password);
  }

  /*slidingItem included to enable the item to slide back when done, name commes from HTML*/
  async editPassword(password, index, slidingItem) {
    console.log("Edit Item = ", password, password._id);
    const toast = await this.toastController.create({
      message: 'Editing ' + password.name + '...',
      duration: 2000
    });
    toast.present();

    console.log("Editing Password");
    this.inputDialogService.showPrompt(password, password._id, slidingItem);

  }
  

  async addPassword() {
    console.log("Adding Password");
    this.inputDialogService.showPrompt();
  }

  
  async sharePassword(password, index, slidingItem) {
    console.log("Sharing Item = ", password, index);
    const toast = await this.toastController.create({
      message: 'Sharing ' + password.description + '...',
      duration: 2000
    });
    toast.present();

    /*needed to close the sliding items*/
    slidingItem.close();

    let message = "Description: " + password.description + "  Password: " + password.password;
    let subject = "Shared via Tech Notes App";

    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("shared successfully!");
    }).catch((error) => {
      // Sharing via email is not possible
      console.error("Error while sharing ", error);
    });

  }



}
