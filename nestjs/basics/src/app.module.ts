import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
// Root module which import all other modules

// Modules -> group related providers and controllers together

@Module({
  imports: [BlogModule],
  controllers: [AppController],
  providers: [AppService], // main entry point
})
export class AppModule {}
