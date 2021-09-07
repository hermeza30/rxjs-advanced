import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewObservableComponent } from './components/new-observable/new-observable.component';
import { FunctionObservableComponent } from './components/function-observable/function-observable.component';
import { CancellingObservableComponent } from './components/cancelling-observable/cancelling-observable.component';
import { OperatorsBasicsComponent } from './components/operators-basics/operators-basics.component';
import { OperatorsComponent } from './pages/operators/operators.component';
import { BufferOperatorComponent } from './pages/buffer-operator/buffer-operator.component';
import { BufferCountOperatorComponent } from './pages/buffer-count-operator/buffer-count-operator.component';
import { BufferTimeOperatorComponent } from './pages/buffer-time-operator/buffer-time-operator.component';
import { BufferToggleOperatorComponent } from './pages/buffer-toggle-operator/buffer-toggle-operator.component';
import { BufferWhenOperatorComponent } from './pages/buffer-when-operator/buffer-when-operator.component';
import { TakeOperatorComponent } from './pages/take-operator/take-operator.component';
import { TakeLastComponent } from './pages/take-last/take-last.component';
import { TakeUntilComponent } from './pages/take-until/take-until.component';
import { TakeHileComponent } from './pages/take-hile/take-hile.component';
import { SkipComponent } from './pages/skip/skip.component';
import { SkipLastComponent } from './pages/skip-last/skip-last.component';
import { SkipUntilComponent } from './pages/skip-until/skip-until.component';
import { SkipWhileComponent } from './pages/skip-while/skip-while.component';
import { DistinctComponent } from './pages/distinct/distinct.component';
import { DistinctUntilChangeComponent } from './pages/distinct-until-change/distinct-until-change.component';
import { DistinctUntilKeyChangeComponent } from './pages/distinct-until-key-change/distinct-until-key-change.component';
import { FilterComponent } from './pages/filter/filter.component';
import { SampleComponent } from './pages/sample/sample.component';
import { AuditComponent } from './pages/audit/audit.component';
import { ThrottleComponent } from './pages/throttle/throttle.component';
import { FirstComponent } from './pages/first/first.component';
import { LastComponent } from './pages/last/last.component';
import { DebounceComponent } from './pages/debounce/debounce.component';
import { ElementatComponent } from './pages/elementat/elementat.component';
import { IgnoreElementsComponent } from './pages/ignore-elements/ignore-elements.component';
import { SingleComponent } from './pages/single/single.component';
import { MapComponent } from './pages/map/map.component';
import { MapToComponent } from './pages/map-to/map-to.component';
import { AjaxComponent } from './pages/ajax/ajax.component';
import { MergemapComponent } from './pages/mergemap/mergemap.component';
import { MergemapTOComponent } from './pages/mergemap-to/mergemap-to.component';
import { ConcatmapComponent } from './pages/concatmap/concatmap.component';
import { ExhaustMapComponent } from './pages/exhaust-map/exhaust-map.component';
import { SwitchMapComponent } from './pages/switch-map/switch-map.component';
import { SwitchMapToComponent } from './pages/switch-map-to/switch-map-to.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { CouldObservableComponent } from './pages/could-observable/could-observable.component';
import { ConnectableComponent } from './pages/connectable/connectable.component';
import { ShareComponent } from './pages/share/share.component';
import { BehiviorSubjectComponent } from './pages/behivior-subject/behivior-subject.component';

@NgModule({
  declarations: [
    AppComponent,
    NewObservableComponent,
    FunctionObservableComponent,
    CancellingObservableComponent,
    OperatorsBasicsComponent,
    OperatorsComponent,
    BufferOperatorComponent,
    BufferCountOperatorComponent,
    BufferTimeOperatorComponent,
    BufferToggleOperatorComponent,
    BufferWhenOperatorComponent,
    TakeOperatorComponent,
    TakeLastComponent,
    TakeUntilComponent,
    TakeHileComponent,
    SkipComponent,
    SkipLastComponent,
    SkipUntilComponent,
    SkipWhileComponent,
    DistinctComponent,
    DistinctUntilChangeComponent,
    DistinctUntilKeyChangeComponent,
    FilterComponent,
    SampleComponent,
    AuditComponent,
    ThrottleComponent,
    FirstComponent,
    LastComponent,
    DebounceComponent,
    ElementatComponent,
    IgnoreElementsComponent,
    SingleComponent,
    MapComponent,
    MapToComponent,
    AjaxComponent,
    MergemapComponent,
    MergemapTOComponent,
    ConcatmapComponent,
    ExhaustMapComponent,
    SwitchMapComponent,
    SwitchMapToComponent,
    SubjectComponent,
    CouldObservableComponent,
    ConnectableComponent,
    ShareComponent,
    BehiviorSubjectComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
