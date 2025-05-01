import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alimento } from './entidades/alimentos.entidad';
import { AlimentosModule } from './alimentos/alimentos.module';
import { Receta } from './entidades/receta.entity'; // Importa la entidad Receta
import { RecetasModule } from './recetas/recetas.module';
import { Usuario } from './entidades/usuario.entity';
import { UsuariosModule } from './Usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module'; // Importa el módulo de autenticación
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // base de datos utilizada
      host: 'localhost', // servidor donde esta la base de datos
      port: 3306, // Puerto por defecto de MySQL
      username: 'Zahara', // Nombre de usuario de MySQL
      password: '@Madrid.1990', // Contraseña de MySQL
      database: 'nutrifighters_db', // El nombre de la base de datos que se esta usando
      entities: [Alimento, Receta, Usuario], // Registro de las entidades (modelos de la base de datos)
      synchronize: true, // Esto sincroniza automáticamente el esquema
    }),
    AlimentosModule,
    RecetasModule,
    UsuariosModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


