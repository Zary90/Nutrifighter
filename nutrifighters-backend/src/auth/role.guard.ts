// parte realizada el 02/05

import { Injectable, CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common'; // Importa las clases necesarias de NestJS
import { Reflector } from '@nestjs/core'; // Importa la clase Reflector para acceder a los metadatos de la ruta
//import { JwtStrategy } from './jwt.strategy'; // Importa la estrategia de autenticación JWT (¡Corregido!)  <-- No es necesario importar JwtStrategy aquí
import { JwtPayload } from 'jsonwebtoken'; // Importa el tipo para el payload del JWT (opcional, para mayor claridad)


export const RolesGuard = (roles: string[]): Type<CanActivate> => { // Define una función que recibe un array de roles permitidos y devuelve una clase guardián
  @Injectable() // Aplica el decorador Injectable a la clase interna, permitiendo la inyección de dependencias
  class RoleGuardMixin implements CanActivate { // Declara una clase que implementa la interfaz CanActivate
    constructor(private reflector: Reflector) {} // El constructor recibe una instancia de Reflector, que NestJS inyecta

    async canActivate(context: ExecutionContext): Promise<boolean> { // Implementa el método canActivate de la interfaz CanActivate
      const request = context.switchToHttp().getRequest(); // Obtiene el objeto Request de Express
      const user = request.user; // Obtiene el usuario autenticado del objeto Request.  Este usuario fue adjuntado por la estrategia JWT.


      if (!user || !user.rol) { // Verifica si el usuario existe y tiene un rol asignado
        return false; // Si no, deniega el acceso
      }

      return roles.includes(user.rol); // Verifica si el rol del usuario está incluido en el array de roles permitidos
    }
  }

  return mixin(RoleGuardMixin); // Utiliza la función mixin de NestJS para crear la clase guardián
};
