import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  StreamableFile,
  InternalServerErrorException,
  Res,
} from '@nestjs/common'
import { ExportService } from './export.service'
import { CreateExportDto } from './dto/create-export.dto'
import { UpdateExportDto } from './dto/update-export.dto'
import { utils, write } from 'xlsx'
import * as archiver from 'archiver'

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Post('csv')
  exportCsv(@Body() dataJson) {
    try {
      const rows = [
        { name: 'George Washington', birthday: '1732-02-22' },
        { name: 'John Adams', birthday: '1735-10-19' },
        // ... one row per President
      ]
      const worksheet = utils.json_to_sheet(rows)

      const workbook = utils.book_new()
      utils.book_append_sheet(workbook, worksheet, 'Dates')

      const buffer = write(workbook, { type: 'buffer', bookType: 'csv' })
      return new StreamableFile(buffer)
    } catch (error) {
      console.log({ error })
      throw new InternalServerErrorException('An error has ocurred , check logs')
    }
  }

  @Post('xlsx')
  exportXlsx() {
    try {
      const rows = [
        { name: 'George Washington', birthday: '1732-02-22' },
        { name: 'John Adams', birthday: '1735-10-19' },
        // ... one row per President
      ]
      const worksheet = utils.json_to_sheet(rows)

      const workbook = utils.book_new()
      utils.book_append_sheet(workbook, worksheet, 'Dates')

      const buffer = write(workbook, { type: 'buffer', bookType: 'xlsx' })
      return new StreamableFile(buffer)
    } catch (error) {
      console.log({ error })
      throw new InternalServerErrorException('An error has ocurred , check logs')
    }
  }

  @Post('/zip')
  exportZip(@Res() res: Response) {
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level.
    })
    archive.pipe(res)

    try {
      const rows = [
        { name: 'ZIPGeorge Washington', birthday: '1732-02-22' },
        { name: 'ZIPJohn Adams', birthday: '1735-10-19' },
        // ... one row per President
      ]
      const worksheet = utils.json_to_sheet(rows)

      const workbook = utils.book_new()
      utils.book_append_sheet(workbook, worksheet, 'Dates')

      const buffer = write(workbook, { type: 'buffer', bookType: 'csv' })
      archive.append(new StreamableFile(buffer).getStream(), {
        name: 'data.csv',
      })

      archive.finalize()
    } catch (error) {
      console.log({ error })
      throw new InternalServerErrorException('An error has ocurred , check logs')
    }
  }
}
