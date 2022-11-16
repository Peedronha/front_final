import {Component, Input, OnInit} from '@angular/core';
import {Pet} from '../pet';
import {PetType} from '../../pettypes/pettype';
import {Owner} from '../../owners/owner';
import {ActivatedRoute, Router} from '@angular/router';
import {PetTypeService} from '../../pettypes/pettype.service';
import {PetService} from '../pet.service';
import {OwnerService} from '../../owners/owner.service';

import * as moment from 'moment';

@Component({
  selector: 'app-pet-add',
  templateUrl: './pet-add.component.html',
  styleUrls: ['./pet-add.component.css']
})
export class PetAddComponent implements OnInit {
  pet: Pet;
  @Input() currentType: PetType;
  currentOwner: Owner;

  petTypes: PetType[];
  owners: Owner[];

  addedSuccess = false;
  errorMessage: string ='';

  constructor(private ownerService: OwnerService, private petService: PetService,
              private petTypeService: PetTypeService, private router: Router, private route: ActivatedRoute) {
    this.pet = {} as Pet;
    this.currentOwner = {} as Owner;
    this.currentType = {} as PetType;
    this.petTypes = [];
  }

  ngOnInit() {
    this.petTypeService.getPetTypes().subscribe(
      petTypes => this.petTypes = petTypes,
      error => this.errorMessage = error as any);

      this.ownerService.getOwners().subscribe(
        response => this.owners = response,
        error => this.errorMessage = error as any);
  }
  onSubmit(pet: Pet) {
    // format output from datepicker to short string yyyy-mm-dd format (rfc3339)
    pet.birthDate = moment(pet.birthDate).format('YYYY-MM-DD');

    this.ownerService.getOwnerById(pet.owner.id).subscribe(
      newOwner => {
        this.currentOwner =  newOwner
      },
      error => this.errorMessage = error as any);

    this.petService.addPet(pet).subscribe(
      newPet => {

        alert(newPet)

        alert(pet.owner.id + "---" + this.currentOwner.id)

        this.ownerService.updateOwnerPet(newPet.id, pet.owner.id, this.currentOwner).subscribe(
          response => {
            this.currentOwner = response;
          },
            error => this.errorMessage = error as any);
        this.pet = newPet;
        this.addedSuccess = true;
        //this.gotoOwnerDetail();
      },
      error => this.errorMessage = error as any);
  }

  gotoOwnerDetail() {
    this.router.navigate(['/owners', this.currentOwner.id]);
  }
}
