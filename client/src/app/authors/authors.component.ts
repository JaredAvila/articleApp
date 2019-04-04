import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";

@Component({
  selector: "app-authors",
  templateUrl: "./authors.component.html",
  styleUrls: ["./authors.component.scss"]
})
export class AuthorsComponent implements OnInit {
  data: Object;
  authors: Array<any>;

  constructor(private _service: DataService) {}

  ngOnInit() {
    this.getAllAuthors();
  }

  //Gets all the current articles and then fills the authors array with the articles
  getAllAuthors() {
    // this._service.getAllCurrent().subscribe(data => {
    //   this.data = data;
    //   this.authors = this.data["data"]["items"];
    // });
  }
}
