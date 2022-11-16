import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from '../appointment';
import {AppointmentService} from '../appointment.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css']
})
export class VisitListComponent implements OnInit {

  @Input() visits: Appointment[];
  responseStatus: number = 0;
  noVisits = false;
  errorMessage: string = '';

  constructor(private router: Router, private visitService: AppointmentService) {
    this.visits = [];
  }

  ngOnInit() {
  }

  editVisit(visit: Appointment) {
    this.router.navigate(['/visits', visit.id, 'edit']);
  }

  deleteVisit(visit: Appointment) {
    this.visitService.deleteVisit(visit.id.toString()).subscribe(
      response => {
        this.responseStatus = response;
        console.log('delete success');
        this.visits.splice(this.visits.indexOf(visit), 1 );
        if (this.visits.length === 0) {
            this.noVisits = true;
          }
      },
      error => this.errorMessage = error as any);
  }

  gotoHome() {
    this.router.navigate(['/welcome']);
  }

  addVisit() {
    this.router.navigate(['/visits/add']);
  }
}
