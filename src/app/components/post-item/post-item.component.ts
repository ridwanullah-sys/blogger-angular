import { Component, EventEmitter, Output, Input } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { UiService } from '../../services/ui.service';
import { Post } from '../../Post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.css',
})
export class PostItemComponent {
  constructor(
    private postsService: PostsService,
    private uiServices: UiService,
    private router: Router
  ) {}

  @Input() post: Post | any;

  SetUi(ui: string, post?: Post) {
    this.postsService.setPostToEdit(post);
    this.uiServices.setUi(ui);
  }

  DeletePost(post: Post) {
    this.deleteEvent.emit(post);
  }

  truncateText(text: string): string {
    if (!text) return '';
    if (text.length <= 200) {
      return text;
    } else {
      return text.substring(0, 200) + '...';
    }
  }

  goToPostPage(post: Post) {
    this.router.navigate([`/${post.id}`]);
  }
  @Output() deleteEvent = new EventEmitter();
}
