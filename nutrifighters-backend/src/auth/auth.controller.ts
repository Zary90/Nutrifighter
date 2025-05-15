// parte realizada el 29/04

import { Controller, Post, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common'; // Importa los decoradores y excepciones de NestJS
import { AuthService } from './auth.service'; // Importa el servicio AuthService
import { AuthGuard } from '@nestjs/passport'; // Importa el guardián de autenticación de Passport
import * as bcrypt from 'bcrypt'; // Importa la librería bcrypt para hashear contraseñas
import { Usuario } from '../entidades/usuario.entity'; // Importa la entidad Usuario
import { UsuariosService } from '../Usuarios/usuarios.service'; // Importa el servicio UsuariosService.  Asegúrate de que la ruta es correcta!


@Controller('auth') // Define el prefijo de la ruta para este controlador. Todas las rutas aquí comienzan con '/auth'
export class AuthController {
  constructor(
    private readonly authService: AuthService, // Inyecta el servicio AuthService en el constructor
    private readonly usuariosService: UsuariosService, // Inyecta el servicio UsuariosService en el constructor
  ) {}
// parte realizada el 02/05
  @Post('login') // Define un endpoint POST para iniciar sesión en '/auth/login'
  @UseGuards(AuthGuard('local')) // Aplica el guardián de autenticación 'local' de Passport a esta ruta.  Este guardián validará las credenciales.

// parte realizada el 29/04

  async login(@Request() req: any) { // El parámetro req contiene la información del usuario autenticado por el guardián local
    return this.authService.login(req.user); // Llama al método login del servicio AuthService para generar y devolver un token JWT
  }

  @Post('register') // Define un endpoint POST para registrar un nuevo usuario en '/auth/register'
  async register(@Body() userData: Partial<Usuario>): Promise<any> { // El parámetro userData contiene los datos del nuevo usuario desde el cuerpo de la petición
    const saltRounds = 10; // Define el número de rondas de sal para bcrypt
    const hashedPassword = await bcrypt.hash(userData.contrasena, saltRounds); // Hashea la contraseña del usuario usando bcrypt
    userData.contrasena = hashedPassword; // Sobrescribe la contraseña en texto plano con la versión hasheada
    const usuario = await this.usuariosService.create(userData); // Llama al método create del servicio UsuariosService para crear el nuevo usuario en la base de datos
    return this.authService.login(usuario); // Llama al método login del servicio AuthService para generar un token JWT para el nuevo usuario y así iniciar sesión automáticamente
  }
}
