import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { audit } from 'rxjs/operators';
import { obs } from '../../interface';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styles: [
  ]
})
export class AuditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    interval(1000).pipe(audit(val=>interval(2000))).subscribe(obs)
  }

}
