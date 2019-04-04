import { Component, OnInit, Input } from "@angular/core";
import { DataService } from "../data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.scss"]
})
export class ArticleComponent implements OnInit {
  @Input() article: Object;
  articleToSend: any;

  constructor(private _service: DataService, private _router: Router) {}

  onArticleClick(article) {
    this._service.storeClickedArticle(article);
    this._router.navigate(["/articlePage"]);
  }

  ngOnInit() {}
}
