export interface FolderMetaInterface {
  _embedded: Embedded;
  name: string;
  exif: FolderMetaInterfaceExif;
  resource_id: string;
  created: Date;
  modified: Date;
  path: string;
  comment_ids: CommentIDS;
  type: Type;
  revision: number;
}

export interface Embedded {
  sort: string;
  items: Item[];
  limit: number;
  offset: number;
  path: string;
  total: number;
}

export interface Item {
  _embedded?: Embedded;
  name: string;
  exif: ItemExif;
  created: Date;
  resource_id: string;
  modified: Date;
  path: string;
  comment_ids: CommentIDS;
  type: Type;
  revision: number;
  antivirus_status?: AntivirusStatus;
  size?: number;
  mime_type?: string;
  sizes?: Size[];
  file?: string;
  media_type?: MediaType;
  preview?: string;
  sha256?: string;
  md5?: string;
}

export enum AntivirusStatus {
  Clean = "clean",
}

export interface CommentIDS {
  private_resource: string;
  public_resource: string;
}

export interface ItemExif {
  date_time?: Date;
}

export enum MediaType {
  Document = "document",
  Image = "image",
}

export interface Size {
  url: string;
  name: Name;
}

export enum Name {
  C = "C",
  Default = "DEFAULT",
  L = "L",
  M = "M",
  Original = "ORIGINAL",
  S = "S",
  Xl = "XL",
  Xs = "XS",
  Xxl = "XXL",
  Xxs = "XXS",
  Xxxl = "XXXL",
  Xxxs = "XXXS",
}

export enum Type {
  Dir = "dir",
  File = "file",
}

export type FolderMetaInterfaceExif = object;

export interface ErrorObject {
  message: string;
  description: string;
  error: string;
}
