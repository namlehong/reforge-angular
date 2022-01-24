import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Observable } from 'rxjs'
import { BenchSettings } from '../models'
import { map, shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class BenchCraftService {
  options$: Observable<any>
  data$: Observable<any>

  constructor(private apiService: ApiService) {
    this.data$ = this.getBenchData().pipe(shareReplay(1))
    this.options$ = this.data$
      .pipe(
        map(data =>
          data.reduce(
            (a, b) => [...a, ...b.tiers.map(i => ({ value: i.uid, label: i.mod.join('/') }))],
            [],
          ),
        ),
      )
      .pipe(shareReplay(1))
  }

  get(league: string) {
    return this.apiService.get('/bench/' + league)
  }

  addCraft(league, mod) {
    return this.apiService.post('/bench/' + league, { mod })
  }

  removeCraft(league, mod) {
    return this.apiService.post('/bench/' + league, { mod, is_remove: true })
  }

  getBenchData(): Observable<BenchSettings[]> {
    return this.apiService.dataJSON('/assets/data/bench-mods.json')
  }
}
