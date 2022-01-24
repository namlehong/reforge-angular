import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { SharedModule } from 'src/app/shared.module'
import { TopbarComponent } from './Topbar/topbar.component'
import { TopbarActionsComponent } from './Topbar/Actions/actions.component'
import { TopbarLanguageSwitcherComponent } from './Topbar/LanguageSwitcher/language-switcher.component'
import { TopbarIssuesHistoryComponent } from './Topbar/IssuesHistory/issues-history.component'
import { TopbarSearchComponent } from './Topbar/Search/search.component'
import { TopbarUserMenuComponent } from './Topbar/UserMenu/user-menu.component'
import { TopbarProjectManagementComponent } from './Topbar/ProjectManagement/project-management.component'
import { TopbarFavPagesComponent } from './Topbar/FavPages/fav-pages.component'
import { MenuLeftComponent } from './Menu/MenuLeft/menu-left.component'
import { MenuTopComponent } from './Menu/MenuTop/menu-top.component'
import { FooterComponent } from './Footer/footer.component'
import { BreadcrumbsComponent } from './Breadcrumbs/breadcrumbs.component'
import { SidebarComponent } from './Sidebar/sidebar.component'
import { SupportChatComponent } from './SupportChat/support-chat.component'
import { LeagueSwitcherComponent } from './Topbar/LeagueSwitcher/league-switcher.component'
import { ReforgeWidgetsModule } from '../../reforge-widgets/reforge-widgets.module'

const COMPONENTS = [
  TopbarComponent,
  TopbarIssuesHistoryComponent,
  TopbarSearchComponent,
  TopbarUserMenuComponent,
  TopbarProjectManagementComponent,
  TopbarActionsComponent,
  TopbarLanguageSwitcherComponent,
  MenuLeftComponent,
  MenuTopComponent,
  FooterComponent,
  BreadcrumbsComponent,
  SidebarComponent,
  SupportChatComponent,
  TopbarFavPagesComponent,
  LeagueSwitcherComponent,
]

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    ReforgeWidgetsModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class LayoutModule {}
