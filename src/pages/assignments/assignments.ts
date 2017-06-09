import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AssignmentCreationPage } from '../assignmentCreation/assignmentCreation';

import { DataService, Assignment } from '../../providers/data-service';

/**
 * Generated class for the AssignmentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-assignments',
  templateUrl: 'assignments.html',
})
export class AssignmentsPage implements OnInit {

  assignments: any;
  deleteToggle = false;
  assignmentSelected: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataService, public alert: AlertController) {
  }

  createAssignment() {
      this.navCtrl.push(AssignmentCreationPage).then(() => this.importAssignments());
  }

  importAssignments() {
    this.dataService.setClass("Mobile Development 2017").then(() => {
      console.log("SetClassName")
     this.dataService.getAssignmentList().then(res => {
        console.log(res)
        this.assignments = res;
      })
    })


  }

   toggleDeleteButton() {
    if (!this.deleteToggle) {
      this.deleteToggle = true;
    }
    else this.deleteToggle = false;
  }

  confirmDelete() {
    let alert = this.alert.create({
      title: 'Delete?',
      message: "Are you sure you want to delete this assignment?",
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancelled')
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.dataService.removeAssignment(this.assignmentSelected);
            this.importAssignments();
          }
        }
      ]
    })
    alert.present();
  }

    assClicked() {
    this.navCtrl.push(AssignmentsPage);
  }

  ngOnInit() {
    this.importAssignments();
    console.log("ngOnInit?");
  }

  // ionViewWillEnter(){
  //   this.importAssignments();
  //   console.log("NewInfo");
  // }
}