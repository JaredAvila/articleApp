import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";

@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.scss"]
})
export class ArticlesComponent implements OnInit {
  articleData: Object;
  articles: Array<Object>;

  constructor(private _service: DataService) {}

  ngOnInit() {
    this.getArticles();
  }

  //gets all current articles and fills the articles array
  getArticles() {
    this._service.getAllCurrent().subscribe(data => {
      this.articleData = data["data"];
      this.articles = this.articleData["items"];
    });
  }
}
