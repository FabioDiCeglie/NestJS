import { GetUser } from '@/auth/decorator';
import { JwtGuard } from '@/auth/guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    this.bookmarkService.getBookmarks();
  }

  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {}

  @Post()
  createBookmarks(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {}

  @Patch()
  editBookmarkById(
    @GetUser('id') userId: number,
    @Body() dto: EditBookmarkDto,
  ) {}

  @Delete()
  deleteBookmarkById(@GetUser('id') userId: number) {}
}
