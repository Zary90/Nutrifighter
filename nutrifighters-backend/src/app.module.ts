// creado el 28/04

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'; // Importa los módulos necesarios de NestJS
import { AppController } from './app.controller'; // Importa el controlador principal de la aplicación
import { AppService } from './app.service'; // Importa el servicio principal de la aplicación
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa el módulo TypeOrmModule para la integración con TypeORM
import { Alimento } from './entities/food.entities'; // Importa la entidad Alimento
import { AlimentosModule } from './food/foods.module'; // Importa el módulo AlimentosModule
import { Receta } from './entities/recipe.entity'; // Importa la entidad Receta
import { RecetasModule } from './recetas/recetas.module'; // Importa el módulo RecetasModule
import { Usuario } from './entities/user.entity'; // Importa la entidad Usuario
import { UsuariosModule } from './Usuarios/usuarios.module'; // Importa el módulo UsuariosModule
import { AuthModule } from './auth/auth.module'; // Importa el módulo de autenticación
import { ConfigModule } from '@nestjs/config'; // Importa el módulo de configuración
import { ErrorLoggerMiddleware } from './common/middleware/error-logger.middleware'; // Importa el middleware para el registro de errores

@Module({
  imports: [
    ConfigModule.forRoot(), // Configura ConfigModule para usar variables de entorno
    TypeOrmModule.forRoot({ // Configura TypeORM para la conexión a la base de datos
      type: 'mysql', // base de datos utilizada
      host: 'localhost', // servidor donde esta la base de datos
      port: 3306, // Puerto por defecto de MySQL
      username: 'Zahara', // Nombre de usuario de MySQL
      password: '@Madrid.1990', // Contraseña de MySQL
      database: 'nutrifighters_db', // El nombre de la base de datos que se esta usando
      entities: [Alimento, Receta, Usuario], // Registro de las entidades (modelos de la base de datos)
      synchronize: true, // Esto sincroniza automáticamente el esquema de la base de datos con las entidades (¡CUIDADO: no usar en producción!)
    }),
    AlimentosModule, // Importa el módulo de alimentos
    RecetasModule, // Importa el módulo de recetas
    UsuariosModule, // Importa el módulo de usuarios
    AuthModule, // Importa el módulo de autenticación
  ],
  controllers: [AppController], // Declara los controladores que usa este módulo
  providers: [AppService], // Declara los proveedores (servicios) que usa este módulo
})

// creado el 05/05
export class AppModule implements NestModule { // Declara la clase del módulo principal, que implementa NestModule para configurar el middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorLoggerMiddleware).forRoutes('*'); // Aplica el middleware ErrorLoggerMiddleware a todas las rutas de la aplicación
  }
}
