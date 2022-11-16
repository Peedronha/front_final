import {Owner} from '../owners/owner';
import {Appointment} from '../appointment/appointment';
import {PetType} from '../pettypes/pettype';

export interface Pet {
  id: number;
  name: string;
  birthDate: string;
  type: PetType;
}

export interface Pet {
  owner: Owner;
  id: number;
  name: string;
  birthDate: string;
  type: PetType;
}
