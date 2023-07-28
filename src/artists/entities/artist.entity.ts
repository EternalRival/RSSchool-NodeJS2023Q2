interface ArtistInterface {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export class Artist implements ArtistInterface {
  id: string;
  name: string;
  grammy: boolean;
}
