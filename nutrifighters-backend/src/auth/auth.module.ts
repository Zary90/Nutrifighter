// parte realizada el 29/04

import { Module } from '@nestjs/common'; // Importa el decorador Module
import { AuthService } from './auth.service'; // Importa el servicio AuthService
import { JwtStrategy } from './jwt.strategy'; // Importa la estrategia JwtStrategy
import { PassportModule } from '@nestjs/passport'; // Importa el módulo PassportModule
import { JwtModule } from '@nestjs/jwt'; // Importa el módulo JwtModule
import { UsuariosModule } from '../Usuarios/usuarios.module'; // Importa el modulo de usuarios.  Asegúrate de que la ruta es correcta!
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigModule y ConfigService
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule, // Importa ConfigModule para poder usarlo en este módulo
    PassportModule.register({ defaultStrategy: 'jwt' }), // Configura Passport para usar la estrategia 'jwt' por defecto
    JwtModule.registerAsync({ // Configura el módulo JwtModule de forma asíncrona
      imports: [ConfigModule], // Importa ConfigModule para que esté disponible dentro de useFactory
      useFactory: async (configService: ConfigService) => ({ // Función asíncrona que define la configuración de JwtModule
        secret: configService.get<string>('JWT_SECRET'), // Obtiene la clave secreta para JWT desde la configuración (variables de entorno)
        signOptions: { expiresIn: '1h' }, // Configura las opciones de firma del token JWT (expira en 1 hora)
      }),
      inject: [ConfigService], // Inyecta ConfigService en la función useFactory
    }),
    UsuariosModule, // Importa el módulo de usuarios para poder usar el servicio
  ],
  providers: [AuthService, JwtStrategy], // Declara los providers que usa este módulo (AuthService y JwtStrategy)
  controllers: [AuthController], // Declara el controlador que usa este módulo
  exports: [AuthService], // Exporta AuthService para que pueda ser usado en otros módulos
})
export class AuthModule {} // Exporta la clase del módulo