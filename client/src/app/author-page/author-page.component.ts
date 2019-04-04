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

  filterLastThirtyDays() {
    console.log("Articles array: ", this.authorData["result"]["feed"]["entry"]);

    //map through articles and pull out the array of dates.
    let articles = this.authorData["result"]["feed"]["entry"];
    const dates = articles.map(article => article.published._text.slice(0, 10));
    console.log("dates array: ", dates);

    //get the date 30 days ago
    var date = new Date(new Date().setDate(new Date().getDate() - 30));

    //format date to match format in dates array
    let dateStr = date.toString();
    let monthNum = this.monthNameToNumber(dateStr.slice(4, 7));
    let dayNum = dateStr.slice(8, 11);
    let yearNum = dateStr.slice(11, 15);
    let date30DaysAgo = yearNum + "-" + monthNum + "-" + dayNum;

    //checks dates and flags if any are longer than 30 days ago
    //returns index of article that is out of bounds
    let dateBounds = Date.parse(date30DaysAgo);
    if (!this.checkArticleDates(dates, dateBounds)) {
      //trigger another getArticles type function
    }
  }

  checkArticleDates(dates: Array<string>, dateBounds: number) {
    for (let i = 0; i < dates.length; i++) {
      let publishedDate = Date.parse(dates[i]);
      if (publishedDate < dateBounds) {
        //date is out of bounds return index
        return i;
      }
    }
    return false;
  }

  monthNameToNumber(month: String) {
    switch (month) {
      case "Jan":
        return "01";
      case "Feb":
        return "02";
      case "Mar":
        return "03";
      case "Apr":
        return "04";
      case "May":
        return "05";
      case "Jun":
        return "06";
      case "Jul":
        return "07";
      case "Aug":
        return "08";
      case "Sep":
        return "09";
      case "Oct":
        return "10";
      case "Nov":
        return "11";
      case "Dec":
        return "12";
    }
  }

  onArticleClick(article) {
    this._service.storeClickedArticle(article);
    this._router.navigate(["/articlePage"]);
  }
}
