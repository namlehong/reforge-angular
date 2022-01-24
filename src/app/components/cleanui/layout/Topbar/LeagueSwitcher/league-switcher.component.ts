import { Component } from '@angular/core'
import * as SettingsActions from 'src/app/store/settings/actions'
import { Observable } from 'rxjs'
import { League } from 'src/app/core/models'
import { AppEntityServices } from 'src/app/store/entity/entity-services'
import { AppSelectors } from 'src/app/store/settings'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-league-switcher',
  templateUrl: './league-switcher.component.html',
  styleUrls: ['./league-switcher.component.scss'],
})
export class LeagueSwitcherComponent {
  leagues$: Observable<League[]>
  activeLeague$: Observable<League>

  constructor(
    private appEntityServices: AppEntityServices,
    private appSelectors: AppSelectors,
    private store: Store<any>,
  ) {
    this.leagues$ = this.appEntityServices.leagueService.entities$
    this.activeLeague$ = this.appSelectors.league$
  }

  changeLeague(league: any) {
    this.store.dispatch(
      new SettingsActions.SetLeagueAction({
        league: league.code,
        league_id: league.id,
      }),
    )
  }
}
