import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DevicesProviderService } from '../devices-provider.service';
import { InputDevicesProviderService } from '../input-devices-provider.service';
/*added to enable social sharing on native device, also injected into constructor*/
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  title = "Tech Notes";
  devices = [];

  errorMessage: string;

  descending: boolean = true;
  order: number;
  column: string = 'name';
  terms: string;

  sort(){
    //this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

  constructor(public toastController: ToastController, public alertController: AlertController,public dataService: DevicesProviderService, public inputDeviceService: InputDevicesProviderService, public socialSharing: SocialSharing) {
    dataService.dataChanged$.subscribe((dataChanged:boolean) => {
      this.loadDevices();
    })
  }

  ionViewWillEnter(){
    this.loadDevices();
    this.sort();
  }

  loadDevices() {
    return this.dataService.getDevices()
    .subscribe(
      devices => this.devices = devices,
      error => this.errorMessage = <any>error);
  }

  async removeDevice(device, index) {
    console.log("Removing Device = ", device, index);
    const toast = await this.toastController.create({
      message: 'Removing ' + device.name + '...',
      duration: 2000
    });
    toast.present();

    this.dataService.removeDevice(device);
  }

  /*slidingItem included to enable the item to slide back when done, name commes from HTML*/
  async editDevice(device, index, slidingItem) {
    console.log("Edit device = ", device, device._id);
    const toast = await this.toastController.create({
      message: 'Editing ' + device.name + '...',
      duration: 2000
    });
    toast.present();

    console.log("Editing deivce");
    this.inputDeviceService.showPrompt(device, device._id, slidingItem);

  }
  

  async addDevice() {
    console.log("Adding Device");
    this.inputDeviceService.showPrompt();
  }

  
  async shareDevice(device, index, slidingItem) {
    console.log("Sharing device = ", device, index);
    const toast = await this.toastController.create({
      message: 'Sharing ' + device.name + '...',
      duration: 2000
    });
    toast.present();

    /*needed to close the sliding items*/
    slidingItem.close();

    let message = "Name: " + device.name + "  User: " + device.user + " Notes: " + device.notes;
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
