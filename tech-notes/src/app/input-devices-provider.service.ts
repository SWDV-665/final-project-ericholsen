import { Injectable } from '@angular/core';
/**
 * This service if for the add and edit dialog boxes of the grocery app
 */

import { AlertController } from '@ionic/angular';
import { DevicesProviderService } from './devices-provider.service';

@Injectable({
  providedIn: 'root'
})
export class InputDevicesProviderService {

  constructor(public alertController: AlertController, public dataService: DevicesProviderService) { }

  /* the ? next to inputs makes them optional */
  async showPrompt(deviceData?, index?, slidingItem?) {
    console.log("showPrompt", deviceData, index)
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: deviceData ? 'Edit Item' : 'Add Item',
      inputs: [
 /*       {
          name: '_id',
          disabled: true
        },*/
        {
          name: 'name',
          placeholder: "Name",
          value: deviceData ? deviceData.name : null
        },
        {
          name : 'user',
          placeholder: "User",
          value: deviceData ? deviceData.user : null
        },
        {
          name : 'notes',
          placeholder: "Notes",
          value: deviceData ? deviceData.notes : null
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Save',
          handler: (deviceData) => {
            console.log('Confirm Save', deviceData, index);
            if (index !== undefined) {
              this.dataService.editDevice(deviceData, index);
              /* item doesn't slide back when finished without this line*/
              slidingItem.close();
            }
            else {
              this.dataService.addDevice(deviceData);
            }
            
            
          }
        }
      ]
    });

    await alert.present();

  }

}