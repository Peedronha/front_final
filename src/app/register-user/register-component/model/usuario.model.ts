export  enum Features{
  Post = 'Posts',
}

export enum Permission{
  None = 'None',
  View = 'View',
  Admin = 'Admin',
}

export  class  FeaturePermission{
  feature: Features;
  permission: Permission;
}

export class UsuarioModel {
    id: number = 0;
    email: string = '';
    username: string = '';
    senha: string = '';
    roles: FeaturePermission[];
}
