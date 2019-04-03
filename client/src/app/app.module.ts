import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { DataService } from "./data.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ArticlesComponent } from "./articles/articles.component";
import { AuthorsComponent } from "./authors/authors.component";
import { NavbarComponent } from './navbar/navbar.component';
import { ArticleComponent } from './article/article.component';

@NgModule({
  declarations: [AppComponent, ArticlesComponent, AuthorsComponent, NavbarComponent, ArticleComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
