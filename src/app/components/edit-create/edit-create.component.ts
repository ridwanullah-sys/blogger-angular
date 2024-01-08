import { Component, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Post } from '../../Post';
import { PostsService } from '../../services/posts.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-edit-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-create.component.html',
  styleUrl: './edit-create.component.css',
})
export class EditCreateComponent {
  @Output() EditEvent = new EventEmitter();
  @Output() CreateEvent = new EventEmitter();
  subsription: Subscription;
  ui: string = 'edit';
  postSubscription: Subscription;
  post: Post | undefined;
  title: string | undefined;
  content: string | undefined;

  constructor(
    private uiServices: UiService,
    private postService: PostsService
  ) {
    this.subsription = this.uiServices.getUi().subscribe((ui) => {
      this.ui = ui;
    });

    this.postSubscription = this.postService
      .getPostToEdit()
      .subscribe((post) => {
        this.title = post?.title;
        this.content = post?.content;
        this.post = post;
      });
  }

  SetUi(ui: string) {
    this.postService.setPostToEdit(undefined);
    this.uiServices.setUi('home');
  }

  onSubmit() {
    this.ui == 'edit' ? this.EditPost() : this.CreatePost();
  }

  EditPost() {
    if (this.post) {
      if (!this.title) {
        alert('Error: Title is Required');
        return;
      }

      if (!this.content) {
        alert('Error: Content is Required');
        return;
      }
      this.post.title = this.title;
      this.post.content = this.content;
      this.post.updatedAt = format(new Date(), 'yyyy/MM/dd HH:mm:ss');

      this.EditEvent.emit(this.post);
    }
  }

  CreatePost() {
    if (!this.title) {
      alert('Error: Title is Required');
      return;
    }

    if (!this.content) {
      alert('Error: Content is Required');
      return;
    }

    const newpost = {
      title: this.title,
      content: this.content,
      publishedAt: format(new Date(), 'yyyy/MM/dd HH:mm:ss'),
      updatedAt: format(new Date(), 'yyyy/MM/dd HH:mm:ss'),
    };

    this.CreateEvent.emit(newpost);
  }
}
