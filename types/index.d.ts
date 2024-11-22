/*
API Responses
*/
export interface SpotifyCredentialResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface APISpotifyNowPlayingResponse {
  currentlyPlaying?: CurrentlyPlaying;
  recentlyPlayed: RecentlyPlayed;
}

export interface CurrentlyPlaying {
  device: Device;
  shuffle_state: boolean;
  smart_shuffle: boolean;
  repeat_state: string;
  timestamp: number;
  context: Context;
  progress_ms: number;
  item: TrackClass;
  currently_playing_type: CurrentlyPlayingTypeEnum;
  actions: Actions;
  is_playing: boolean;
}

export interface Actions {
  disallows: Disallows;
}

export interface Disallows {
  resuming: boolean;
}

export interface Context {
  external_urls: ExternalUrls;
  href: string;
  type: AlbumTypeEnum;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export enum AlbumTypeEnum {
  Album = "album",
  Single = "single",
}

export enum CurrentlyPlayingTypeEnum {
  Track = "track",
}

export interface Device {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  supports_volume: boolean;
  type: string;
  volume_percent: number;
}

export interface TrackClass {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: CurrentlyPlayingTypeEnum;
  uri: string;
}

export interface Album {
  album_type: AlbumTypeEnum;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: Date | string;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: ArtistType;
  uri: string;
}

export enum ArtistType {
  Artist = "artist",
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export enum ReleaseDatePrecision {
  Day = "day",
}

export interface ExternalIDS {
  isrc: string;
}

export interface RecentlyPlayed {
  items: Track[];
  next: string;
  cursors: Cursors;
  limit: number;
  href: string;
}

export interface Cursors {
  after: string;
  before: string;
}

export interface Track {
  track: TrackClass;
  played_at: Date | string;
  context: null;
}

export interface SpotifyQueue {
  currently_playing: CurrentlyPlayingQueue;
  queue: CurrentlyPlayingQueue[];
}

export interface CurrentlyPlayingQueue {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: CurrentlyPlayingType;
  uri: string;
}

export interface Album {
  album_type: AlbumTypeEnum;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: string;
}

export enum AlbumTypeEnum {
  Album = "album",
  Single = "single",
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: ArtistType;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export enum ArtistType {
  Artist = "artist",
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export enum ReleaseDatePrecision {
  Day = "day",
}

export interface ExternalIDS {
  isrc: string;
}

export enum CurrentlyPlayingType {
  Track = "track",
}
