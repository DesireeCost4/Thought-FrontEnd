import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FeedComponent } from './feed/feed.component';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { InputPostComponent } from './input-post/input-post.component'; // Importando o módulo necessário
import { LogoutComponent } from './logout/logout.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsidebarLeftComponent } from './asidebar-left/asidebar-left.component';
import { SearchComponent } from './search/search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MessageComponent } from './message/message.component';
import { FriendshipComponent } from './friendship/friendship.component';
import { FriendshipListComponent } from './friendship-list/friendship-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedComponent,
    ProfileComponent,
    MainComponent,
    NavBarComponent,
    InputPostComponent,
    LogoutComponent,
    RegisterComponent,
    AsidebarLeftComponent,
    SearchComponent,
    MessageComponent,
    FriendshipListComponent,
    UserProfileComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    FontAwesomeModule,
    YouTubePlayerModule,
    FriendshipComponent
],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
