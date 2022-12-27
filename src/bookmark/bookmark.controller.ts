import { JwtGuard } from '@/auth/guard';
import {
  Controller,
  Delete,
  Get,
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
  getBookmarks() {}

  @Get()
  getBookmarkById() {}

  @Post()
  createBookmarks() {}

  @Patch()
  editBookmarkById() {}

  @Delete()
  deleteBookmarkById() {}
}
