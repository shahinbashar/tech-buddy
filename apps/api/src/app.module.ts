import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { type AppConfig, validateEnv } from './config/env.validation';
import { AuthModule } from './modules/auth/auth.module';
import { CircularsModule } from './modules/circulars/circulars.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ExaminationsModule } from './modules/examinations/examinations.module';
import { NotesModule } from './modules/notes/notes.module';
import { PremiumModule } from './modules/premium/premium.module';
import { ProgressModule } from './modules/progress/progress.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { TopicsModule } from './modules/topics/topics.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv, cache: true }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppConfig, true>) => ({
        throttlers: [{ name: 'default', ttl: 60_000, limit: 120 }],
        // Automated tests hammer the API from one address.
        skipIf: () => config.get('NODE_ENV', { infer: true }) === 'test',
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService<AppConfig, true>) => ({
        secret: config.get('JWT_SECRET', { infer: true }),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRES_IN', { infer: true }),
        },
      }),
    }),
    PrismaModule,
    PremiumModule,
    UploadsModule,
    AuthModule,
    UsersModule,
    CircularsModule,
    SubjectsModule,
    TopicsModule,
    NotesModule,
    QuestionsModule,
    ExaminationsModule,
    ProgressModule,
    DashboardModule,
  ],
  controllers: [HealthController],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
