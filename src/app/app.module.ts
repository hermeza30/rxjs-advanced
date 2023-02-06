import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import { ReplaySubjectComponent } from './pages/replay-subject/replay-subject.component';
import { AsyncSubjectComponent } from './pages/async-subject/async-subject.component';
import { VoidSubjectComponent } from './pages/void-subject/void-subject.component';
import { CatchErrorComponent } from './pages/catch-error/catch-error.component';
import { RetryComponent } from './pages/retry/retry.component';
import { RetryWhenComponent } from './pages/retry-when/retry-when.component';
import { CombineLatestComponent } from './pages/combine-latest/combine-latest.component';
import { ConcatComponent } from './pages/concat/concat.component';
import { ForkJoinComponent } from './pages/fork-join/fork-join.component';
import { MergeComponent } from './pages/merge/merge.component';
import { PartitionComponent } from './pages/partition/partition.component';
import { RaceComponent } from './pages/race/race.component';
import { ZipComponent } from './pages/zip/zip.component';
import { MergesComponentsComponent } from './pages/merges-components/merges-components.component';
import { ConcatComponentComponent } from './pages/concat-component/concat-component.component';
import { SwitchvsmergevsexhaustvsconcatComponent } from './pages/switchvsmergevsexhaustvsconcat/switchvsmergevsexhaustvsconcat.component';
import { SchedulersComponent } from './pages/schedulers/schedulers.component';
import { DeferComponent } from './pages/defer/defer.component';
import { RangeComponent } from './pages/range/range.component';
import { GenerateComponent } from './pages/generate/generate.component';
import { TimerComponent } from './pages/timer/timer.component';
import { CountComponent } from './pages/count/count.component';
import { MaxComponent } from './pages/max/max.component';
import { MinComponent } from './pages/min/min.component';
import { ReduceComponent } from './pages/reduce/reduce.component';
import { ScanComponent } from './pages/scan/scan.component';
import { IsemptyComponent } from './pages/isempty/isempty.component';
import { IntervalComponent } from './pages/interval/interval.component';
import { FindindexComponent } from './pages/findindex/findindex.component';
import { FindComponent } from './pages/find/find.component';
import { EveryComponent } from './pages/every/every.component';
import { DelayComponent } from './pages/delay/delay.component';
import { DefaultemptyComponent } from './pages/defaultempty/defaultempty.component';
import { ToarrayComponent } from './pages/toarray/toarray.component';
import { SubscribeonComponent } from './pages/subscribeon/subscribeon.component';
import { ObserveronComponent } from './pages/observeron/observeron.component';
import { MaterializeComponent } from './pages/materialize/materialize.component';
import { DesmaterializeComponent } from './pages/desmaterialize/desmaterialize.component';
import { TapComponent } from './pages/tap/tap.component';
import { ShareReplayComponent } from './pages/share-replay/share-replay.component';
import { LastValueFromComponent } from './pages/last-value-from/last-value-from.component';
import { UsginModule } from './pages/usgin/usgin.module';
import { DatabaseReactComponent } from './database-react/database-react.component';
import { WithLatestFormComponent } from './pages/with-latest-form/with-latest-form.component';
import { EjemplosDeInternetComponent } from './pages/ejemplos-de-internet/ejemplos-de-internet.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ColdVsHotObservablesComponent } from './pages/cold-vs-hot-observables/cold-vs-hot-observables.component';
import { ObservableWithPromiseModule } from './pages/observable-with-promise/observable-with-promise.module';
import { WhatsNewsModule } from './pages/whats-news/whats-news.module';

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
    ReplaySubjectComponent,
    AsyncSubjectComponent,
    VoidSubjectComponent,
    CatchErrorComponent,
    RetryComponent,
    RetryWhenComponent,
    CombineLatestComponent,
    ConcatComponent,
    ForkJoinComponent,
    MergeComponent,
    PartitionComponent,
    RaceComponent,
    ZipComponent,
    MergesComponentsComponent,
    ConcatComponentComponent,
    SwitchvsmergevsexhaustvsconcatComponent,
    SchedulersComponent,
    DeferComponent,
    RangeComponent,
    GenerateComponent,
    TimerComponent,
    CountComponent,
    MaxComponent,
    MinComponent,
    ReduceComponent,
    ScanComponent,
    IsemptyComponent,
    IntervalComponent,
    FindindexComponent,
    FindComponent,
    EveryComponent,
    DelayComponent,
    DefaultemptyComponent,
    ToarrayComponent,
    SubscribeonComponent,
    ObserveronComponent,
    MaterializeComponent,
    DesmaterializeComponent,
    TapComponent,
    ShareReplayComponent,
    LastValueFromComponent,
    DatabaseReactComponent,
    WithLatestFormComponent,
    EjemplosDeInternetComponent,
    ColdVsHotObservablesComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    UsginModule,
    ObservableWithPromiseModule,
    WhatsNewsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
