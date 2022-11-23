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
import {Vet} from "../../vets/vet";
import {VetService} from "../../vets/vet.service";

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

  Pets: Pet[];
  Owners: Owner[];
  Vets: Vet[];

  constructor(private vetService: VetService,
              private visitService: AppointmentService,
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
    this.petService.getPets().subscribe(
      pet => {
        this.Pets = pet;
        this.ownerService.getOwners().subscribe(
          owner => {
            this.Owners = owner;
          }
        )
      },
      error => this.errorMessage = error as any);

    this.vetService.getVets().subscribe(
      vet => {
        this.Vets = vet;
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
