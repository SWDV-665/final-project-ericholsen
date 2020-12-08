import { Injectable } from '@angular/core';
/**
 * This service if for the add and edit dialog boxes of the grocery app
 */

import { AlertController } from '@ionic/angular';
import { PasswordsProviderService } from './passwords-provider.service';

@Injectable({
  providedIn: 'root'
})
export class InputDialogServiceService {

  constructor(public alertController: AlertController, public dataService: PasswordsProviderService) { }

  /* the ? next to inputs makes them optional */
  async showPrompt(passwordData?, index?, slidingItem?) {
    console.log("showPrompt", passwordData, index)
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: passwordData ? 'Edit Item' : 'Add Item',
      inputs: [
 /*       {
          name: '_id',
          disabled: true
        },*/
        {
          name: 'description',
          placeholder: "Description",
          value: passwordData ? passwordData.description : null
        },
        {
          name : 'password',
          placeholder: "Password",
          value: passwordData ? passwordData.password : null
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
          handler: (passwordData) => {
            console.log('Confirm Save', passwordData, index);
            if (index !== undefined) {
              this.dataService.editPassword(passwordData, index);
              /* item doesn't slide back when finished without this line*/
              slidingItem.close();
            }
            else {
              this.dataService.addPassword(passwordData);
            }
            
            
          }
        }
      ]
    });

    await alert.present();

  }

}