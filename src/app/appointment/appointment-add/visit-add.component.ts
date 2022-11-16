import {Component, OnInit} from '@angular/core';
import {Appointment} from '../appointment';
import {AppointmentService} from '../appointment.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PetService} from '../../pets/pet.service';
import {Pet} from '../../pets/pet';
import {PetType} from '../../pettypes/pettype';
import {Owner} from '../../owners/owner';

import * as moment from 'moment';
import {OwnerService} from '../../owners/owner.service';
import {visit} from "@angular/compiler-cli/src/ngtsc/util/src/visitor";

@Component({
  selector: 'app-visit-add',
  templateUrl: './visit-add.component.html',
  styleUrls: ['./visit-add.component.css']
})
export class VisitAddComponent implements OnInit {

  visit: Appointment;
  currentPet: Pet;
  currentOwner: Owner;
  currentPetType: PetType;
  addedSuccess = false;
  errorMessage: string = '';

  constructor(private visitService: AppointmentService,
              private petService: PetService,
              private ownerService: OwnerService,
              private router: Router,
              private route: ActivatedRoute) {
    this.visit = {} as Appointment;
    this.currentPet = {} as Pet;
    this.currentOwner = {} as Owner;
    this.currentPetType = {} as PetType;

  }

  ngOnInit() {
    const petId = this.route.snapshot.params['id'];
    this.petService.getPetById(petId).subscribe(
      pet => {
        this.currentPet = pet;
        this.currentPetType = this.currentPet.type;
        this.ownerService.getOwnerById(this.visit.owner).subscribe(
          owner => {
            this.currentOwner = owner;
          }
        )
      },
      error => this.errorMessage = error as any);
  }

  onSubmit(visit: Appointment) {
    visit.id;
    const that = this;

    // format output from datepicker to short string yyyy-mm-dd format (rfc3339)
    visit.date = moment(visit.date).format('YYYY-MM-DD');

    this.visitService.addVisit(visit).subscribe(
      newVisit => {
        this.visit = newVisit;
        this.addedSuccess = true;
        that.gotoOwnerDetail();
      },
      error => this.errorMessage = error as any
    );
  }

  gotoOwnerDetail() {
    this.router.navigate(['/owners', this.currentOwner.id]);
  }

}
