import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Login } from './login/login';
import { Register } from './register/register';
import { NavBar } from './navbar/navbar';
import { User } from './user/user';
import { PostList } from './postlist/postlist';
import { AuthGuard } from './auth/auth.guard';
import { CdkTableModule } from '@angular/cdk/table';
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons/dist';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileSelectDirective, FileUploadModule } from 'ng2-file-upload';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DialogOverviewExampleDialog } from './dialog/dialog-overview-example-dialog';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { PostService } from './service/postlist.service';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';
import { RegisterService } from './service/register.service';
import { FancyImageUploaderModule } from 'ng2-fancy-image-uploader';
import { RouterModule, Routes } from '@angular/router';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { ImageUploadModule } from "angular2-image-upload";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { 
  MatFormFieldModule, 
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
const appRoutes: Routes = [
  { path: 'login', component: Login, pathMatch: 'full' },
  { path: 'register', component: Register, pathMatch: 'full' },
  { path: '', component: PostList, pathMatch: 'full', canActivate: [AuthGuard]}, 
  { path: 'user', component: User, canActivate: [AuthGuard] }
  // { path: 'hero/:id',      component: HeroDetailComponent }
  // { path: '**', component: PageNotFoundComponent }
];

const importModules = [
  FormsModule,
  FileUploadModule,
  HttpModule,
  HttpClientJsonpModule,
  MatFormFieldModule,
  BrowserAnimationsModule,
  BrowserModule,
  HttpClientModule,
  FancyImageUploaderModule,
  MatIconModule,
  MatAutocompleteModule,
  MatButtonModule,
  CdkTableModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatStepperModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  ReactiveFormsModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  Angular2PromiseButtonModule.forRoot(),
  RouterModule.forRoot(appRoutes),
  FroalaEditorModule.forRoot(), 
  FroalaViewModule.forRoot(),
  ImageUploadModule.forRoot(),
  ShareButtonsModule.forRoot()
];

const exportModules = [
  MatFormFieldModule,
  CdkTableModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatStepperModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
];

@NgModule({
  declarations: [
    AppComponent,
    DialogOverviewExampleDialog,
    Login,
    Register,
    PostList,
    User,
    NavBar
  ],
  imports: [ ...importModules],
  entryComponents: [DialogOverviewExampleDialog],
  exports: [ ...exportModules],
  providers: [AuthGuard, PostService, AuthService, RegisterService, JwtInterceptor, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
