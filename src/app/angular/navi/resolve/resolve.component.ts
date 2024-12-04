import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resolve',
  templateUrl: './resolve.component.html',
  styleUrls: ['./resolve.component.scss']
})
export class ResolveComponent implements OnInit {
  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
  }
}
