export class Player {
  name: string;
  per1Countries: Map<string, boolean> = new Map<string, boolean>();
  per2Countries: Map<string, boolean> = new Map<string, boolean>();
  per4Countries: any = {};
  per8Countries: any = {};
  per16Countries: any = {};
  goalPoints: number;
}
