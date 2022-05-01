import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse, ApiBadRequestResponse } from "@nestjs/swagger";
import { RegistrationService } from "../services/registration.service";
import { RegistrationDto } from "../dtos/registration.dto";
import { RegistrationResponseDto } from "../dtos/registration-response.dto";

@ApiTags('Registration')
@Controller('registration')
export class RegistrationController {
  constructor(private readonly _registrationService: RegistrationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Register user' })
  @ApiOkResponse({ type: RegistrationResponseDto })
  @ApiBadRequestResponse({ type: RegistrationResponseDto })
  async registration(@Body() registrationDto: RegistrationDto ): Promise<RegistrationResponseDto> {
    return this._registrationService.registration(registrationDto)
  }
}