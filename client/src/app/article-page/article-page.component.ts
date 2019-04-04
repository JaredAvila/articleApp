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

  handleAuthorClick(authorName) {
    let start = "0",
      end = "10";
    this._service
      .getAuthorArticlesXML(authorName, start, end)
      .subscribe(xml => {
        this._service.storeCurrentAuthor(xml, authorName);
        this.router.navigate(["/authorPage"]);
      });
  }
}
