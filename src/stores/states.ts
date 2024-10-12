import { makeAutoObservable } from "mobx";
import { FolderMetaInterface } from "./types";
import { ErrorObject } from "./types";
import { Item } from "./types";

interface Items {
  items: Item[];
}

class States {
  filesPathUrl: string = "https://cloud-api.yandex.net/v1/disk/resources/files";
  defaultUrl: string = "https://cloud-api.yandex.net/v1/disk/resources?path=";
  defaultPath: string = "CaseLabDocuments";
  currentPath: string = "CaseLabDocuments";

  folderMeta: FolderMetaInterface | ErrorObject = {
    message: "bad",
    description: "",
    error: "",
  };
  categoriesMeta: Item[] = [];
  allFilesMeta: Items = {
    items: [],
  };
  currentImgUrl: string = "";
  currentImgName: string = "";

  token: string = "";
  authorized: boolean = false;
  noSuchFolder: boolean = false;
  authorisationFailed: boolean = false;
  manageDisk: boolean = false;
  modalShowing: boolean = false;

  showCategories: boolean = false;
  showAllFiles: boolean = false;
  rootFolder : boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  // togglers
  toggleAuthorisationFailed = () => {
    this.authorisationFailed = !this.authorisationFailed;
  };
  toggleAuthorized = () => {
    this.authorized = !this.authorized;
  };
  toggleNoSuchFolder = () => {
    this.noSuchFolder = !this.noSuchFolder;
  };
  toggleManageDisk = () => {
    this.manageDisk = !this.manageDisk;
  };
  toggleShowCategories = () => {
    this.showCategories = !this.showCategories;
  };
  toggleshowAllFiles = () => {
    this.showAllFiles = !this.showAllFiles;
  };
  toggleModalShowing = () => {
    this.modalShowing = !this.modalShowing;
  };
  toggleRootFolder = () => {
    this.rootFolder = !this.rootFolder;
  }

  
  // setters
  setCurrentImgName = (name: string) => {
    this.currentImgName = name;
  };
  setCurrentImgUrl = (url: string) => {
    this.currentImgUrl = url;
  };
  setToken = (str: string) => {
    this.token = str;
  };
  setFolderMeta = (obj: FolderMetaInterface) => {
    this.folderMeta = obj;
  };
  setFilesMeta = (obj: Items) => {
    this.allFilesMeta = obj;
  };
  setCategoriesMeta = (obj: FolderMetaInterface) => {
    if ("_embedded" in obj) {
      this.categoriesMeta = obj._embedded.items;
    }
  };
  setCurrentPath = (path: string) => {
    if (path === "") {
      this.currentPath = this.defaultPath;
      return;
    }
    this.currentPath = path;
  };

  //async
  fetchFolderData = async (path: string) => {
    let currentPath: string = "";
    if (path === "") {
      currentPath = this.defaultUrl + this.defaultPath;
    }
    if (path === "up") {
      currentPath = this.defaultUrl + this.currentPath;
    }
    const result = await fetch(currentPath, {
      method: "GET",
      headers: {
        Authorization: this.token,
      },
    });
    const objRes = await result.json();
    if ("message" in objRes) {
      if ("description" in objRes) {
        if (objRes.description === "Resource not found.") {
          if (this.authorisationFailed) this.toggleAuthorisationFailed();
          if (!this.noSuchFolder) this.toggleNoSuchFolder();
          return;
        } else if (objRes.description === "Unauthorized") {
          if (this.noSuchFolder) this.toggleNoSuchFolder();
          if (!this.authorisationFailed) this.toggleAuthorisationFailed();
          return;
        }
        if (this.noSuchFolder) this.toggleNoSuchFolder();
        if (this.authorisationFailed) this.toggleAuthorisationFailed();
        return;
      }
      if (this.noSuchFolder) this.toggleNoSuchFolder();
      if (this.authorisationFailed) this.toggleAuthorisationFailed();
    }
    if (path === "") {
      this.toggleAuthorized();
      this.setCategoriesMeta(objRes);
    }
    this.setFolderMeta(objRes);
  };

  fetchFilesData = async () => {
    const result = await fetch(this.filesPathUrl, {
      method: "GET",
      headers: {
        Authorization: this.token,
      },
    });
    const objRes = await result.json();
    this.setFilesMeta(objRes);
  };
}

export default new States();
