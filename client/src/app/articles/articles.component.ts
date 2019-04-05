import { Component, OnInit, HostListener } from "@angular/core";
import { DataService } from "../data.service";

@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.scss"]
})
export class ArticlesComponent implements OnInit {
  articleData: Object;
  articles: Array<Object> = [];
  start = 0;
  end = 29;
  xmlText: String;

  constructor(private _service: DataService) {}

  ngOnInit() {
    this.getXMLText();
  }

  //gets the XML as a string to pass to server to parse
  getXMLText() {
    this._service.getAllCurrent(this.start, this.end).subscribe(data => {
      this.xmlText = data;
      this.getAllArticles(this.xmlText);
    });
  }

  //when at bottom of page load next 30 articles
  loadNextThirty() {
    this.start += 30;
    this.end += 30;
    this.getXMLText();
  }
  //detects when user has hit the bottom of page and triggers next call
  @HostListener("window:scroll", [])
  onScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.loadNextThirty();
    }
  }

  //passes XML string to be returned as JSON, sets artcile date in component state
  getAllArticles(xmlText) {
    this._service.getAllArticles(xmlText).subscribe(data => {
      this.articleData = data;
      for (
        let i = 0;
        i < this.articleData["result"]["feed"]["entry"].length;
        i++
      ) {
        // console.log(this.articleData["result"]["feed"]["entry"][i]);
        this.articles.push(this.articleData["result"]["feed"]["entry"][i]);
      }

      console.log(this.articles);
    });
  }
}
