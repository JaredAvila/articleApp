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

  xmlText: String;
  ngOnInit() {
    this.getXMLText();
  }

  //gets the XML as a string to pass to server to parse
  getXMLText() {
    this._service.getAllCurrent().subscribe(data => {
      this.xmlText = data;
      this.getAllArticles(this.xmlText);
    });
  }

  //passes XML string to be returned as JSON
  getAllArticles(xmlText) {
    this._service.getAllArticles(xmlText).subscribe(data => {
      this.articleData = data;
      this.articles = this.articleData["result"]["feed"]["entry"];
    });
  }
}
