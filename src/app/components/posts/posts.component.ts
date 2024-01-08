import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../../Post';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';
import { UiService } from '../../services/ui.service';
import { PostItemComponent } from '../post-item/post-item.component';
import { Subscription } from 'rxjs';
import { EditCreateComponent } from '../edit-create/edit-create.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule,
    PostItemComponent,
    EditCreateComponent,
    HeaderComponent,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  posts: Post[] = [];
  subsription: Subscription;
  ui: string = 'home';
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  //totalPage: number = Math.ceil(this.posts.length / this.itemsPerPage);

  constructor(
    private postsService: PostsService,
    private uiServices: UiService
  ) {
    this.subsription = this.uiServices.getUi().subscribe((ui) => {
      this.ui = ui;
    });
  }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe((posts) => (this.posts = posts));
  }

  DeletePost(post: Post) {
    this.postsService
      .deletePost(post)
      .subscribe(
        () => (this.posts = this.posts.filter((p) => p.id !== post.id))
      );
  }

  EditPost(post: Post) {
    this.postsService.editPost(post).subscribe(() => {
      this.uiServices.setUi('home');
      alert('Updated Successfully');
    });
  }

  CreatePost(post: Post) {
    this.postsService.createPost(post).subscribe((p) => {
      this.posts.unshift(post);
      this.uiServices.setUi('home');
      alert('New Post created Successfully');
    });
  }

  SetUi(ui: string) {
    this.uiServices.setUi(ui);
  }

  Filter(value: string) {
    this.searchText = value;
  }

  getPosts(): Post[] {
    if (this.searchText) {
      return this.posts.filter((p) => p.title.includes(this.searchText));
    } else {
      return this.posts;
    }
  }

  TotalPage(): number {
    return Math.ceil(this.getPosts().length / this.itemsPerPage);
  }

  setCurrentPage(page: number) {
    if (page >= 0 && page <= this.TotalPage()) {
      this.currentPage = page;
    }
  }

  getCurrentItems() {
    var startIndex = (this.currentPage - 1) * this.itemsPerPage;
    var endIndex = startIndex + this.itemsPerPage;
    return this.getPosts().slice(startIndex, endIndex);
  }
}
