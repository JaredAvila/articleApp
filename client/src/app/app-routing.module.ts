import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ArticlesComponent } from "./articles/articles.component";
import { AuthorsComponent } from "./authors/authors.component";

const routes: Routes = [
  {
    path: "",
    component: ArticlesComponent
  },
  {
    path: "authors",
    component: AuthorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
