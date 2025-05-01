// parte realizada el 29/04

import { Injectable, UnauthorizedException } from '@nestjs/common'; // Importa Injectable y UnauthorizedException
import { PassportStrategy } from '@nestjs/passport'; // Importa PassportStrategy
import { Strategy, ExtractJwt } from 'passport-jwt'; // Importa la estrategia JWT de Passport y la función para extraer el token
import { UsuariosService } from '../Usuarios/usuarios.service'; // Importa el servicio UsuariosService. 
import { ConfigService } from '@nestjs/config'; // Importa ConfigService para acceder a la configuracion

@Injectable() // Marca la clase como un proveedor
export class JwtStrategy extends PassportStrategy(Strategy) { // Extiende PassportStrategy con la estrategia JWT de Passport
  constructor(
    private readonly usuariosService: UsuariosService, // Inyecta el servicio UsuariosService
    private readonly configService: ConfigService, // Inyecta ConfigService
  ) {
    super({ // Llama al constructor de la clase padre (PassportStrategy)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Configura como se extrae el token JWT de la peticion 
      ignoreExpiration: false, // Indica si se debe ignorar la expiracion del token 
      secretOrKey: configService.get<string>('JWT_SECRET'), // Obtiene la clave secreta para verificar la firma del token desde la configuración
    });
  }

  // Metodo para validar el token JWT y obtener la informacion del usuario
  async validate(payload: any) {
    const user = await this.usuariosService.findOne(payload.sub); // Busca el usuario en la base de datos usando el 'sub' (id del usuario) del payload del token
    if (!user) {
      throw new UnauthorizedException(); // Si no se encuentra el usuario, lanza una excepcion UnauthorizedException
    }
    return { id: payload.sub, email: payload.email, rol: payload.rol }; // Si el usuario se encuentra, devuelve un objeto con su informacion (id, email, rol)
  }
}