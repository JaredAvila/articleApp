import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-author-page",
  templateUrl: "./author-page.component.html",
  styleUrls: ["./author-page.component.scss"]
})
export class AuthorPageComponent implements OnInit {
  authorName: String;
  authorData: Object = {
    result: {
      feed: {
        entry: []
      }
    }
  };

  constructor(private _service: DataService, private _router: Router) {}

  ngOnInit() {
    this.getAuthor();
  }

  getAuthor() {
    this._service.getCurrentAuthor().subscribe(data => {
      this.authorData = data;
    });
    this.authorName = this._service.getCurrentAuthorName();
  }

  onArticleClick(article) {
    this._service.storeClickedArticle(article);
    this._router.navigate(["/articlePage"]);
  }
}
