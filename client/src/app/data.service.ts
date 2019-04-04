import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class DataService {
  article: any;
  author: any;
  authorName: any;

  constructor(private _http: HttpClient, private router: Router) {}

  //ARTICLE ROUTES

  //get 20 articles
  getAllCurrent() {
    return this._http.get(
      "http://export.arxiv.org/api/query?search_query=all:data%20science+OR+psychiatry+OR+therapy+OR+machine%20learning&start=0&max_results=20",
      { responseType: "text" }
    );
  }
  getAuthor(url) {
    return this._http.get(url, { responseType: "text" });
  }
  getAllArticles(xmlText) {
    return this._http.post("/api/articles", { xmlText });
  }

  storeClickedArticle(article) {
    this.article = article;
  }
  getCurrentArticle() {
    return this.article;
  }
  storeCurrentAuthor(xml, author) {
    this.authorName = author;
    this.author = xml;
  }
  getCurrentAuthor() {
    return this._http.post("/api/author", { xml: this.author });
  }
  getCurrentAuthorName() {
    return this.authorName;
  }
}
