import { Component } from '@angular/core';
import { Post } from '../../Post';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../Comments';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.css',
})
export class PostPageComponent {
  post: Post | undefined;
  id: any;
  comments: Comment[] = [];
  new_comment: string | undefined;

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.params.subscribe((params) => {
      this.postService
        .getPost(params['id'])
        .subscribe((val) => (this.post = val));

      this.postService.getComments().subscribe((val) => {
        this.comments = val.filter((v) => v.postId == params['id']);
      });
    });
  }

  postComment() {
    if (this.post) {
      if (!this.post.id) return;
      if (!this.new_comment) {
        alert('Invalid comment');
        return;
      }

      const new_comment = {
        postId: this.post.id,
        comment: this.new_comment,
      };

      this.postService.postComment(new_comment).subscribe((comment) => {
        this.comments.unshift(comment);
        this.new_comment = '';
      });
    }
  }
}
