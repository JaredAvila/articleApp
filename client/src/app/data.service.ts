import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class DataService {
  article: any;
  xml: any;
  authorName: any;

  constructor(private _http: HttpClient, private router: Router) {}

  //ARTICLE ROUTES

  //gets XML string text for 20 articles
  getAllCurrent(start, end) {
    return this._http.get(
      "http://export.arxiv.org/api/query?search_query=all:data%20science+OR+psychiatry+OR+therapy+OR+machine%20learning&start=" +
        start +
        "&max_results=" +
        end,
      { responseType: "text" }
    );
  }

  //gets XML string for author object with variable article array
  getAuthorArticlesXML(author, start, end) {
    // let authorName = author.split(" ");
    // let authorString = "";
    // for (let i = 0; i < authorName.length; i++) {
    //   if (i === 0) {
    //     authorString += authorName[i];
    //   } else {
    //     authorString += "+" + authorName[i];
    //   }
    // }
    // console.log(authorString);
    let url =
      "http://export.arxiv.org/api/query?search_query=au:'" +
      author +
      "'&sortBy=submittedDate&sortOrder=descending&start=" +
      start +
      "&max_results=" +
      end;
    return this._http.get(url, { responseType: "text" });
  }

  //gets 30 articles
  getAllArticles(xmlText) {
    return this._http.post("/api/articles", { xmlText });
  }

  //stores the clicked article in service
  storeClickedArticle(article) {
    this.article = article;
  }

  //returns currently selected article object
  getCurrentArticle() {
    return this.article;
  }

  //stores selected authors name and XML string
  storeCurrentAuthor(xml, authorName) {
    this.authorName = authorName;
    this.xml = xml;
  }

  //gets selected author object
  getCurrentAuthor() {
    return this._http.post("/api/author", { xml: this.xml });
  }

  //gets selected author name
  getCurrentAuthorName() {
    return this.authorName;
  }
}
