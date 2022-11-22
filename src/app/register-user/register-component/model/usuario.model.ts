export class UsuarioModel {
    id: number = 0;
    email: string = '';
    username: string = '';
    senha: string = '';
    enabled: boolean = false;
    roles: string[] = [];
}
