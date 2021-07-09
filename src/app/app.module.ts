import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "src/app/app-routing.module";
import { AppComponent } from "src/app/app.component";
import { TodosModule } from "src/app/todos/todos.modules";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // TODO: Remove TodosModule from initial bundle, load as lazy loaded module
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
