// Core Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// Angular Material
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// External packages
import { TextMaskModule } from 'angular2-text-mask';
// Components
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { MainCompComponent } from './components/main-comp/main-comp.component';
import { PdfCreatorComponent } from './components/pdf-creator/pdf-creator.component';
import { SetlistPdfComponent } from './components/setlist-pdf/setlist-pdf.component';
// Modals
import { ConfirmActionModalComponent } from './components/modals/confirm-action-modal/confirm-action.modal';
import { SetTimerModalComponent } from './components/modals/set-timer-modal/set-timer.modal';
import { EditSetnameModalComponent } from './components/modals/edit-setname-modal/edit-setname.modal';
import { TranslateComponent } from './components/shared/translate/translate.component';



@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    ConfirmActionModalComponent,
    EditSetnameModalComponent,
    SetTimerModalComponent,
    PdfCreatorComponent,
    SetlistPdfComponent,
    MainCompComponent,
    TranslateComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    DragDropModule,
    HttpClientModule,
    TextMaskModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmActionModalComponent,
    SetTimerModalComponent,
    EditSetnameModalComponent
  ],
})
export class AppModule {
}
