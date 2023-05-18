import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilModule } from './perfil/perfil.module';
import { UnidadModule } from './unidad/unidad.module';
import { RutaModule } from './ruta/ruta.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ContravencionesModule } from './contravenciones/contravenciones.module';
import { ViajesModule } from './viajes/viajes.module';
import { AuthModule } from './auth/auth.module';
import { Empresa_infoModule } from './empresa_info/empresa_info.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot({
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: '127.0.0.1',//161.35.53.248
        port: 3306,
        username: 'root',//remoteuser
        password: '',//remote202@PP
        database: 'biometrico_fv',//biometrico_fv
        // database: 'demo_flor',
        entities: [__dirname + './**/**/*entity{.ts,.js}'],
        // entities: ['dist/**/*.entity{ .ts,.js}'],
        autoLoadEntities: true,
        synchronize: false,
        // timezone: 'UTC'
      }),
    }),
    PerfilModule,
    UnidadModule,
    RutaModule,
    UsuariosModule,
    ContravencionesModule,
    ViajesModule,
    AuthModule,
    Empresa_infoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
