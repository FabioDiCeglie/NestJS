import { JwtGuard } from '@/auth/guard';
import { Controller, Delete, Get, Patch, UseGuards } from '@nestjs/common';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  @Get()
  getBookmarks() {}

  @Get()
  getBookmarkById() {}

  @Patch()
  editBookmarkById() {}

  @Delete()
  deleteBookmarkById() {}
}
