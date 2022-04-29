import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { RegistrationService } from "../services/registration.service";
import { RegistrationDto } from "../dtos/registration.dto";
import { RegistrationResponseDto } from "../dtos/registration-response.dto";

@Controller('registration')
export class RegistrationController {
  constructor(private readonly _registrationService: RegistrationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async registration(@Body() registrationDto: RegistrationDto ): Promise<RegistrationResponseDto> {
    return this._registrationService.registration(registrationDto)
  }
}