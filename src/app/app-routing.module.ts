
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCompComponent } from './components/main-comp/main-comp.component';
import { PdfCreatorComponent } from './components/pdf-creator/pdf-creator.component';
import { SetlistPdfComponent } from './components/setlist-pdf/setlist-pdf.component';

const routes: Routes = [
/*   { path: '', component: MainCompComponent},
  { path: 'exportpdf', component: PdfCreatorComponent } */
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: MainCompComponent},
  {path: 'exportpdf', component: PdfCreatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
