import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-article-page",
  templateUrl: "./article-page.component.html",
  styleUrls: ["./article-page.component.scss"]
})
export class ArticlePageComponent implements OnInit {
  article: any;

  constructor(private _service: DataService, private router: Router) {}

  ngOnInit() {
    this.article = this._service.getCurrentArticle();
  }

  handleAuthorClick(author) {
    let url =
      "http://export.arxiv.org/api/query?search_query=au:" +
      author +
      "&sortBy=submittedDate&sortOrder=descending&start=0&max_results=10";
    // console.log(author);
    this._service.getAuthor(url).subscribe(data => {
      this._service.storeCurrentAuthor(data, author);
      this.router.navigate(["/authorPage"]);
    });
  }
}
