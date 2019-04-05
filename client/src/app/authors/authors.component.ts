import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-authors",
  templateUrl: "./authors.component.html",
  styleUrls: ["./authors.component.scss"]
})
export class AuthorsComponent implements OnInit {
  data: Object;
  authors: Array<any> = [];
  start: number = 0;
  end: number = 29;
  xmlText: String;

  constructor(private _service: DataService, private router: Router) {}

  ngOnInit() {
    this.getAllAuthors();
  }

  //Gets all the current articles and then fills the authors array with the articles
  getAllAuthors() {
    this._service.getAllCurrent(this.start, this.end).subscribe(data => {
      this.data = data;
      this.xmlText = data;
      this._service.getAllArticles(this.xmlText).subscribe(data => {
        let articles = data["result"]["feed"]["entry"];
        for (let i = 0; i < articles.length; i++) {
          if (articles[i]["author"].length) {
            for (let j = 0; j < articles[i]["author"].length; j++) {
              this.authors.push(articles[i]["author"][j]["name"]["_text"]);
            }
          } else {
            this.authors.push(articles[i]["author"]["name"]["_text"]);
          }
        }
      });
    });
  }

  handleAuthorClick(authorName) {
    let start = "0",
      end = "99";
    this._service
      .getAuthorArticlesXML(authorName, start, end)
      .subscribe(xml => {
        this._service.storeCurrentAuthor(xml, authorName);
        this.router.navigate(["/authorPage"]);
      });
  }
}
