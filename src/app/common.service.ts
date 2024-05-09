import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
  createArticle(article: any) {
    return this.http.post('http://localhost:5273/api/Article', article);
  }
  getAllArticles() {
    return this.http.get('http://localhost:5273/api/Article');
  }
  updateArticle(article: any) {
    return this.http.put( 'http://localhost:5273/api/Article/' + article.id, article );
  }

  deleteArticle(article: any) {
    return this.http.delete( 'http://localhost:5273/api/Article/' + article.id );
  }
}
