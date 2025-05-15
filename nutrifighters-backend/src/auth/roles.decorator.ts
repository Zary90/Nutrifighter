// parte realizada el 02/05

import { SetMetadata } from '@nestjs/common'; // Importa la función SetMetadata de NestJS

export const Roles = (...roles: string[]) => SetMetadata('roles', roles); // Define un decorador llamado Roles que recibe un array de roles como argumento
