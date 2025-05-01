// parte realizada el 29/04

import { Injectable, UnauthorizedException } from '@nestjs/common'; // Importa Injectable y UnauthorizedException
import { UsuariosService } from '../Usuarios/usuarios.service'; // Importa el servicio UsuariosService. Asegúrate de que la ruta es correcta!
import { JwtService } from '@nestjs/jwt'; // Importa el servicio JwtService
import * as bcrypt from 'bcrypt'; // Importa la librería bcrypt para hashear contraseñas
import { Usuario } from '../entidades/usuario.entity'; // Importa la entidad Usuario

@Injectable() // Marca la clase como un servicio
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService, // Inyecta el servicio UsuariosService
    private readonly jwtService: JwtService, // Inyecta el servicio JwtService
  ) {}

  // Método para validar las credenciales de un usuario (email y contraseña)
  async validateUser(email: string, pass: string): Promise<Usuario | null> {
    const user = await this.usuariosService.findOneByEmail(email); // Busca el usuario por su email
    if (user && bcrypt.compareSync(pass, user.contrasena)) { // Si el usuario existe y la contraseña coincide
      return user; // Devuelve el objeto usuario
    }
    return null; // Devuelve null si las credenciales son inválidas
  }

  // Método para generar un token JWT para un usuario autenticado
  async login(user: Usuario) {
    const payload = { sub: user.id, email: user.email, rol: user.rol }; // Crea el "payload" del token JWT con información del usuario (id, email, rol)
    return {
      access_token: this.jwtService.sign(payload), // Genera el token JWT y lo devuelve en un objeto
    };
  }
}
