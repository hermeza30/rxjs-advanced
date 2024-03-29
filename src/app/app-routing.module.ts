import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { UsginComponent } from './pages/usgin/usgin.component';
import { DatabaseReactComponent } from './database-react/database-react.component';
import { WithLatestFormComponent } from './pages/with-latest-form/with-latest-form.component';
import { EjemplosDeInternetComponent } from './pages/ejemplos-de-internet/ejemplos-de-internet.component';
import { ColdVsHotObservablesComponent } from './pages/cold-vs-hot-observables/cold-vs-hot-observables.component';
import { ObservableWithPromiseComponent } from './pages/observable-with-promise/observable-with-promise.component';
import { WhatsNewsComponent } from './pages/whats-news/whats-news.component';
import { MulticastingOperatorsComponent } from './pages/multicasting-operators/multicasting-operators.component';
import { CombineObsLikeProComponent } from './pages/combine-obs-like-pro/combine-obs-like-pro.component';
import { SwitchMapVsMergeMapComponent } from './pages/switch-map-vs-merge-map/switch-map-vs-merge-map.component';

const routes: Routes = [
  {
    path: 'operators',
    component: OperatorsComponent,
    children: [
      { path: 'buffer', component: BufferOperatorComponent },
      { path: 'buffercount', component: BufferCountOperatorComponent },
      { path: 'buffertime', component: BufferTimeOperatorComponent },
      { path: 'buffertoggle', component: BufferToggleOperatorComponent },
      { path: 'bufferwhen', component: BufferWhenOperatorComponent },
      { path: 'take', component: TakeOperatorComponent },
      { path: 'takelast', component: TakeLastComponent },
      { path: 'takeuntil', component: TakeUntilComponent },
      { path: 'takewhile', component: TakeHileComponent },
      { path: 'skip', component: SkipComponent },
      { path: 'skiplast', component: SkipLastComponent },
      { path: 'skipuntil', component: SkipUntilComponent },
      { path: 'skipwhile', component: SkipWhileComponent },
      { path: 'distinct', component: DistinctComponent },
      { path: 'distinctuntilchange', component: DistinctUntilChangeComponent },
      {
        path: 'distinctuntilkeychange',
        component: DistinctUntilKeyChangeComponent,
      },
      { path: 'filter', component: FilterComponent },
      { path: 'sample', component: SampleComponent },
      { path: 'audit', component: AuditComponent },
      { path: 'throttle', component: ThrottleComponent },
      { path: 'first', component: FirstComponent },
      { path: 'last', component: LastComponent },
      { path: 'debounce', component: DebounceComponent },
      { path: 'elementat', component: ElementatComponent },
      { path: 'ignoreelements', component: IgnoreElementsComponent },
      { path: 'single', component: SingleComponent },
      { path: 'map', component: MapComponent },
      { path: 'mapto', component: MapToComponent },
      { path: 'ajax', component: AjaxComponent },
      { path: 'mergemap', component: MergemapComponent },
      { path: 'mergemapto', component: MergemapTOComponent },
      { path: 'concatmap', component: ConcatmapComponent },
      { path: 'exhaustmap', component: ExhaustMapComponent },
      { path: 'switchmap', component: SwitchMapComponent },
      { path: 'switchmapto', component: SwitchMapToComponent },
      { path: 'share', component: ShareComponent },
      { path: 'retry', component: RetryComponent },
      { path: 'retrywhen', component: RetryWhenComponent },
      { path: 'combinelatest', component: CombineLatestComponent },
      { path: 'concat', component: ConcatComponent },
      { path: 'forkjoin', component: ForkJoinComponent },
      { path: 'merge', component: MergeComponent },
      { path: 'partition', component: PartitionComponent },
      { path: 'race', component: RaceComponent },
      { path: 'zip', component: ZipComponent },
      { path: 'defer', component: DeferComponent },
      { path: 'range', component: RangeComponent },
      { path: 'generate', component: GenerateComponent },
      { path: 'timer', component: TimerComponent },
      { path: 'count', component: CountComponent },
      { path: 'max', component: MaxComponent },
      { path: 'min', component: MinComponent },
      { path: 'reduce', component: ReduceComponent },
      { path: 'scan', component: ScanComponent },
      { path: 'isempty', component: IsemptyComponent },
      { path: 'interval', component: IntervalComponent },
      { path: 'findindex', component: FindindexComponent },
      { path: 'find', component: FindComponent },
      { path: 'every', component: EveryComponent },
      { path: 'delay', component: DelayComponent },
      { path: 'defaultifempty', component: DefaultemptyComponent },
      { path: 'toarray', component: ToarrayComponent },
      { path: 'subscribeon', component: SubscribeonComponent },
      { path: 'observeon', component: ObserveronComponent },
      { path: 'materialize', component: MaterializeComponent },
      { path: 'dematerialize', component: DesmaterializeComponent },
      { path: 'tap', component: TapComponent },
      { path: 'shareReplay', component: ShareReplayComponent },
      { path: 'lastValueFrom', component: LastValueFromComponent },
      { path: 'using', component: UsginComponent },
      { path: 'withLatestForm', component: WithLatestFormComponent },
      { path: 'ejemplosDeInternet', component: EjemplosDeInternetComponent },
      { path: 'coldvshot', component: ColdVsHotObservablesComponent },
      {
        path: 'observableandpromise',
        component: ObservableWithPromiseComponent,
      },
      { path: 'whatsnews', component: WhatsNewsComponent },
      {
        path: 'multicastingoperators',
        component: MulticastingOperatorsComponent,
      },
      {
        path: 'combineobslikepro',
        component: CombineObsLikeProComponent,
      },
    ],
  },
  {
    path: 'subject',
    component: SubjectComponent,
  },
  {
    path: 'couldobservable',
    component: CouldObservableComponent,
  },
  {
    path: 'connectable',
    component: ConnectableComponent,
  },
  {
    path: 'behiviorsubject',
    component: BehiviorSubjectComponent,
  },
  {
    path: 'replaysubject',
    component: ReplaySubjectComponent,
  },
  {
    path: 'asyncsubject',
    component: AsyncSubjectComponent,
  },
  {
    path: 'voidsubject',
    component: VoidSubjectComponent,
  },
  {
    path: 'catcherror',
    component: CatchErrorComponent,
  },
  {
    path: 'mergescomponent',
    component: MergesComponentsComponent,
  },
  {
    path: 'concatscomponent',
    component: ConcatComponentComponent,
  },
  {
    path: 'switchvsmergevsexhaustvsconcat',
    component: SwitchvsmergevsexhaustvsconcatComponent,
  },
  {
    path: 'schedulers',
    component: SchedulersComponent,
  },
  {
    path: 'reactdatabase',
    component: DatabaseReactComponent,
  },
  {
    path: 'switchmapvsmergemap',
    component: SwitchMapVsMergeMapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
