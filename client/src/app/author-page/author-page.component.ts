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
  articles: Array<Object> = [];
  start = 0;
  end = 99;

  constructor(private _service: DataService, private _router: Router) {}

  ngOnInit() {
    this.getAuthor();
  }

  //get authors data and sets it in Component state
  getAuthor() {
    this._service.getCurrentAuthor().subscribe(data => {
      this.authorData = data;
      //gets all articles from last 30 days
      this.filterLastThirtyDays();
    });
    this.authorName = this._service.getCurrentAuthorName();
  }

  //gets new XML string with author data, variable articles array
  setNewAuthorXML(start, end) {
    this._service
      .getAuthorArticlesXML(this.authorName, start, end)
      .subscribe(xml => {
        this._service.storeCurrentAuthor(xml, this.authorName);
        this.getAuthor();
      });
  }

  //filters only last 30 days of articles
  filterLastThirtyDays() {
    let articles = this.authorData["result"]["feed"]["entry"];
    for (let i = 0; i < articles.length; i++) {
      this.articles.push(articles[i]);
    }
    //map through articles and pull out the array of dates.
    const dates = this.articles.map(article =>
      article["published"]["_text"].slice(0, 10)
    );

    //get the date 30 days ago
    var date = new Date(new Date().setDate(new Date().getDate() - 30));

    //format date to match format in dates array
    let dateStr = date.toString();
    let monthNum = this.monthNameToNumber(dateStr.slice(4, 7));
    let dayNum = dateStr.slice(8, 11);
    let yearNum = dateStr.slice(11, 15);
    let date30DaysAgo = yearNum + "-" + monthNum + "-" + dayNum;
    let dateBounds = Date.parse(date30DaysAgo);

    //checks dates and updates array accordingly
    let index = this.checkArticleDates(dates, dateBounds);
    if (index === false) {
      //haven't reached the dateBounds yet, run it again! (recursive call)
      this.buildArticleArray();
    } else {
      //found articles out of dateBounds. Append with spliced articles
      this.articles = this.articles.splice(0, index);
      console.log("the end");
    }
  }

  //updates start and end bounds for article retrieval and resets author data
  buildArticleArray() {
    this.start += 100;
    this.end += 100;
    console.log("start ", this.start, " end ", this.end);
    this.setNewAuthorXML(this.start, this.end);
  }

  //checks for any dates that are out of bounds
  checkArticleDates(dates: Array<string>, dateBounds: number) {
    for (let i = 0; i < dates.length; i++) {
      let publishedDate = Date.parse(dates[i]);
      if (publishedDate < dateBounds) {
        //date is out of bounds return index
        return i;
      }
    }
    //if all dates are within 30 days return false
    return false;
  }

  //converts the month name to a number
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

  //stores clicked article in the service and re-routes to article page
  onArticleClick(article) {
    this._service.storeClickedArticle(article);
    this._router.navigate(["/articlePage"]);
  }
}
