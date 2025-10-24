import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
// make the module as globally scoped
@Global()
@Module({
  // registering prisma service in this module
  providers: [PrismaService],
  // this make sure prisma service is available to other modules
  exports: [PrismaService],
})
export class PrismaModule {}
