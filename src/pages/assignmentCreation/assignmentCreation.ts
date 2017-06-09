import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DataService, Assignment } from '../../providers/data-service';

/**
 * Generated class for the ClassCreation page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-assignmentCreation',
    templateUrl: 'assignmentCreation.html',
})
export class AssignmentCreationPage {
    assignments: Assignment[] = [];
    className = "";
    Title: any;
    PointsPossible: number;
    Description: string;
    DueDate: string;
    DateAssigned: string;
    GithubLink: string;
    user: any = null;

    doneCallback: any = null;

    constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataService) {
        this.getUser();
    }

    getUser(){
    this.dataService.getUserAuthStatus().subscribe(user => {
      this.user = user;
    });
  }

    addAssignment() {
    let assignment:Assignment = new Assignment();

      assignment.Title = this.Title;
      assignment.PointsPossible = this.PointsPossible;
      assignment.Description = this.Description;
      // Program Does NOT like this Description
      assignment.DueDate = this.DueDate;
      assignment.DateAssigned = this.DateAssigned;
      assignment.GithubLink = this.GithubLink;
  //  assignment.Key // DON'T MODIFY KEY

    this.dataService.addAssignment(assignment).then(() => {
        this.navCtrl.pop();
        
    });
    
    }

}
