import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  title = 'Bloggee';
  search: string | undefined;
  @Output() searchEvent = new EventEmitter();

  constructor(private postsService: PostsService) {}

  searchTitle(value: string) {
    this.searchEvent.emit(value);
  }
}
