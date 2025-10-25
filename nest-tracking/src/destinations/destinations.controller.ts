import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DestinationsService } from './destinations.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';
// creating new destination
// fetching  destination
// delete  destination
// update  destination
@Controller('destinations')
@UseGuards(JwtAuthGuard)
export class DestinationsController {
  constructor(private readonly destinationService: DestinationsService) {}

  @Post()
  create(@Request() req, @Body() createDestinationDto: CreateDestinationDto) {
    return this.destinationService.create(
      req.user.userId,
      createDestinationDto,
    );
  }

  @Get()
  findAll(@Request() req) {
    return this.destinationService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.destinationService.findOne(req.user.userId, +id);
  }
  @Delete(':id')
  delete(@Request() req, @Param('id') id: string) {
    return this.destinationService.remove(+id);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDestinationDto: UpdateDestinationDto,
  ) {
    return this.destinationService.update(
      req.user.userId,
      +id,
      updateDestinationDto,
    );
  }
}
