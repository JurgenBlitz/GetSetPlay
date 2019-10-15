import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';
// import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
// Components
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
// Modals
import { ConfirmActionModalComponent } from './components/modals/confirm-action-modal/confirm-action.modal';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    ConfirmActionModalComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    DragDropModule,
    TextMaskModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmActionModalComponent]
})
export class AppModule {
}
