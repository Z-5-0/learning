import {Component, Input} from '@angular/core';
import {Vehicle} from '../../../shared/models/vehicle'

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {
  @Input() searchText2: string = '';

  vehicles: Vehicle[] = [
    {
      id: 12,
      label: 'Hajabusa',
      type: 'motor',
      details: {
        colors: ['white', 'grey'],
        weight: 430
      },
      img: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/145875/hayabusa-right-front-three-quarter.jpeg?isig=0&q=80'
    },
    {
      id: 56,
      label: 'Punto 199',
      type: 'car',
      details: {
        colors: ['blue', 'orange', 'green', 'black', 'silver'],
        weight: 1100
      },
      img: 'https://e7.pngegg.com/pngimages/162/547/png-clipart-third-generation-fiat-punto-fiat-500-fiat-idea-fiat-punto-compact-car-building-thumbnail.png'
    },
    {
      id: 89,
      label: 'Astra GTC',
      type: 'car',
      details: {
        colors: ['white', 'black', 'red'],
        weight: 1600
      },
      img: 'https://w7.pngwing.com/pngs/95/269/png-transparent-vauxhall-motors-vauxhall-astra-opel-astra-opel-gtc-red-vauxhall-astra-vxr-car-compact-car-sedan-transport-thumbnail.png'
    },
    {
      id: 111,
      label: 'DS3 Racing',
      type: 'car',
      details: {
        colors: ['yellow', 'brown', 'black'],
        weight: 1150
      },
      img: 'https://ocdn.eu/pulscms-transforms/1/k58ktkpTURBXy82N2Q5ZDdjM2M1YmU3OWMwZjA5ODA4NzQzOWE2MTIwNi5qcGeRlQLNAugAwsM'
    },
    {
      id: 156,
      label: 'Hyosung',
      type: 'motor',
      details: {
        colors: ['blue', 'red'],
        weight: 1600
      },
      img: 'https://images5.1000ps.net/images_bikekat/2007/21-HYOSUNG/2296-GT_650_R/gr.jpg'
    },
    {
      id: 187,
      label: 'Veloster',
      type: 'car',
      details: {
        colors: ['orange', 'red', 'black'],
        weight: 1600
      },
      img: 'https://autocarpet.hu/img/49420/80000891/500x500/80000891.webp?time=1709910204'
    },
  ];

  selectedVehicle: Vehicle = new Vehicle();

  constructor() {
  }
}
