import { Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { PostPageComponent } from './components/post-page/post-page.component';

export const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: ':id', component: PostPageComponent },
];
