import { Component, Input, ViewChild } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { Player } from './players';
import { PlayerDetailsComponent } from './player-details/player-details.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent {
  @Input({required: true}) player!: Player;
  @ViewChild(PlayerDetailsComponent) detailsComponent!: PlayerDetailsComponent;
  protected detailsOpen = false;
  protected scrollStrategy = this.overlay.scrollStrategies.reposition();

  constructor(private overlay: Overlay) {}
}
