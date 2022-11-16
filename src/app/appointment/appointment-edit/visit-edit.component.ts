import {Component, OnInit} from '@angular/core';
import {Appointment} from '../appointment';
import {Pet} from '../../pets/pet';
import {Owner} from '../../owners/owner';
import {PetType} from '../../pettypes/pettype';
import {AppointmentService} from '../appointment.service';
import {ActivatedRoute, Router} from '@angular/router';

import * as moment from 'moment';
import {OwnerService} from '../../owners/owner.service';
import {PetService} from '../../pets/pet.service';

@Component({
  selector: 'app-visit-edit',
  templateUrl: './visit-edit.component.html',
  styleUrls: ['./visit-edit.component.css']
})
export class VisitEditComponent implements OnInit {
  visit: Appointment;
  currentPet: Pet;
  currentOwner: Owner;
  currentPetType: PetType;
  updateSuccess = false;
  errorMessage: string = '';

  constructor(private visitService: AppointmentService,
              private petService: PetService,
              private ownerService: OwnerService,
              private route: ActivatedRoute,
              private router: Router) {
    this.visit = {} as Appointment;
    this.currentPet = {} as Pet;
    this.currentOwner = {} as Owner;
    this.currentPetType = {} as PetType;
  }

  ngOnInit() {
    const visitId = this.route.snapshot.params['id'];
    this.visitService.getVisitById(visitId).subscribe(
      visit => {
        this.visit = visit;
        this.petService.getPetById(visit.pet).subscribe(
          pet => {
            this.currentPet = pet;
            this.currentPetType = pet.type;
            this.ownerService.getOwnerByPetId(pet.id).subscribe(
              owner => {
                this.currentOwner = owner;
              }
            )
          }
        )
      },
      error => this.errorMessage = error as any);
  }

  onSubmit(visit: Appointment) {
    visit.pet = this.currentPet.id;

    // format output from datepicker to short string yyyy-mm-dd format (rfc3339)
    visit.date = moment(visit.date).format('YYYY-MM-DD');

    this.visitService.updateVisit(visit.id.toString(), visit).subscribe(
      res => this.gotoOwnerDetail(),
      error => this.errorMessage = error as any);

  }

  gotoOwnerDetail() {
    this.router.navigate(['/owners', this.currentOwner.id]);
  }

}
