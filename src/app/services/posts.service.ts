import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../Post';
import { Observable, Subject } from 'rxjs';
import { Comment } from '../Comments';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiUrl = 'https://jsonplaceholder.org/posts';
  private commentsUrl = 'https://jsonplaceholder.org/comments';
  private subject = new Subject<any>();
  private postToEdit: Post | undefined;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getPost(postId: any): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${postId}`);
  }

  deletePost(post: Post): Observable<Post> {
    return this.http.delete<Post>(`${this.apiUrl}/${post.id}`);
  }

  editPost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${post.id}`, post);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentsUrl);
  }

  postComment(new_comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.commentsUrl, new_comment);
  }

  setPostToEdit(post: Post | undefined) {
    this.postToEdit = post;
    this.subject.next(this.postToEdit);
  }

  getPostToEdit(): Observable<Post | undefined> {
    return this.subject.asObservable();
  }
}
