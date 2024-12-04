export class Vehicle {
  id?: number;
  label?: string;
  type?: 'motor' | 'car';
  details?: {
    colors: string[],
    weight: number,
  };
  img?: string
}
