import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ArticlesComponent } from "./articles/articles.component";
import { AuthorsComponent } from "./authors/authors.component";
import { ArticlePageComponent } from "./article-page/article-page.component";
import { AuthorPageComponent } from "./author-page/author-page.component";

const routes: Routes = [
  {
    path: "",
    component: ArticlesComponent
  },
  {
    path: "authors",
    component: AuthorsComponent
  },
  {
    path: "articlePage",
    component: ArticlePageComponent
  },
  {
    path: "authorPage",
    component: AuthorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
