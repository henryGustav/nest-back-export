import { Injectable } from '@nestjs/common'
import { CreateExportDto } from './dto/create-export.dto'
import { UpdateExportDto } from './dto/update-export.dto'

@Injectable()
export class ExportService {
  findAll() {
    return `This action returns all export`
  }
}
