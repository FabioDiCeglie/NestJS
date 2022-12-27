import { GetUser } from '@/auth/decorator';
import { JwtGuard } from '@/auth/guard';
import {
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
  createBookmarks(@GetUser('id') userId: number) {}

  @Patch()
  editBookmarkById(@GetUser('id') userId: number) {}

  @Delete()
  deleteBookmarkById(@GetUser('id') userId: number) {}
}
