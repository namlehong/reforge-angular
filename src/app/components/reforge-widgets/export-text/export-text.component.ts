import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import * as SettingActions from 'src/app/store/settings/actions'
import { FormControl } from '@angular/forms'
import { debounce, debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-export-text',
  templateUrl: './export-text.component.html',
  styleUrls: ['./export-text.component.scss'],
})
export class ExportTextComponent implements OnInit {
  export_include_ign: boolean
  export_coloring: boolean

  exportNoteControl: FormControl = new FormControl()

  constructor(private store: Store<any>) {
    this.store
      .pipe(select(Reducers.getSettings))
      .subscribe(({ export_include_ign, export_coloring, export_note }) => {
        this.export_coloring = export_coloring
        this.export_include_ign = export_include_ign
        this.exportNoteControl.patchValue(export_note, { emitEvent: false })
      })

    this.exportNoteControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data =>
        this.store.dispatch(new SettingActions.SetStateAction({ export_note: data })),
      )
  }

  ngOnInit(): void {}

  onIgnChange(ev) {
    this.store.dispatch(new SettingActions.SetStateAction({ export_include_ign: ev }))
  }

  onColorChange(ev) {
    this.store.dispatch(new SettingActions.SetStateAction({ export_coloring: ev }))
  }
}
