import {Pet} from '../pets/pet';

export interface Appointment {
  id: number;
  date: string;
  description: string;
  owner: number;
  pet:number;
}
