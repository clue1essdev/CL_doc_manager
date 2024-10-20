import { makeAutoObservable } from "mobx";
import { FolderMetaInterface } from "./types";
import { ErrorObject } from "./types";
import { Item } from "./types";

interface Items {
  items: Item[];
}

class States {
  // hardcoded path values
  filesPathUrl: string = "https://cloud-api.yandex.net/v1/disk/resources/files";
  defaultUrl: string = "https://cloud-api.yandex.net/v1/disk/resources?path=/";
  limit: string = "&limit=1000";
  defaultPath: string = "";

  // dynamic path value
  currentPath: string = "";

  // files/paths
  allFoldersPaths: string[] = [];
  allFoldersMeta: Item[] = [];

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

  currentFile: string = "";

  // popup coordinates
  popupX: number = 0;
  popupY: number = 0;

  // flags
  authorized: boolean = false;
  noSuchFolder: boolean = false;
  authorisationFailed: boolean = false;
  manageDisk: boolean = false;
  modalShowing: boolean = false;

  popupShowing: boolean = false;
  moveOptionSelected: boolean = false;

  showCategories: boolean = false;
  showAllFiles: boolean = false;
  rootFolder: boolean = true;
  hideRules: boolean = false;

  pending: boolean = false;
  updatingInterface: boolean = false;

  someErrorThatBrokeEverythingOccurred: boolean = false;

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
  };
  togglePending = () => {
    this.pending = !this.pending;
  };
  togglePopupShowing = () => {
    this.popupShowing = !this.popupShowing;
  };
  toggleMoveOptionSelected = () => {
    this.moveOptionSelected = !this.moveOptionSelected;
  };
  toggleUpdatingInterface = () => {
    this.updatingInterface = !this.updatingInterface;
  };

  setHideRules = () => {
    this.hideRules = true;
  };

  setErrorOccurred = () => {
    this.someErrorThatBrokeEverythingOccurred = true;
  };

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
  setAllFoldersPaths = (paths: string[]) => {
    this.allFoldersPaths = paths;
  };
  setAllFoldersMeta = (arr: Item[]) => {
    this.allFoldersMeta = arr;
  };
  setCurrentPath = (path: string) => {
    this.currentPath = path;
  };

  setCurrentFile = (fileName: string) => {
    this.currentFile = fileName;
  };
  setPopupX = (x: number) => {
    this.popupX = x;
  };

  setPopupY = (y: number) => {
    this.popupY = y;
  };

  resetPopup = () => {
    if (this.moveOptionSelected) this.toggleMoveOptionSelected();
    if (this.popupShowing) this.togglePopupShowing();
  };

  //async
  fetchJson = async (path: string) => {
    const res = await fetch(path, {
      method: "GET",
      headers: {
        Authorization: this.token,
      },
    });
    if (!res.ok) {
      console.log("some error during fetch");
      this.setErrorOccurred();
      return;
    }
    const obj = await res.json();
    return obj;
  };

  fetchAllFoldersData = async (collection: string[]) => {
    let current = this.allFoldersMeta;
    
    const allData = await Promise.all(
      collection.map((url) => this.fetchJson(url))
    );
    current = [...current, ...allData]
    this.setAllFoldersMeta(current);
    
  };

  deleteFile = async (path: string) => {
    const res = await fetch(this.defaultUrl + path, {
      method: "DELETE",
      headers: {
        Authorization: this.token,
      },
    });
    if (!res.ok) {
      console.log("some error while trying to delete a file");
      this.setErrorOccurred();
      return;
    }
    await this.fetchFolderData("");
    await this.fetchFilesData().then(() => {
      if (this.updatingInterface) this.toggleUpdatingInterface();
    });
  };

  moveFile = async (path: string) => {
    const url = "https://cloud-api.yandex.net/v1/disk/resources/move?";
    const from = "from=";
    const to = "&path=";
    const realPath = path === this.defaultPath ? "" : "/" + path;
    const fullUrl = `${url}${from}${this.currentPath}/${this.currentFile}${to}${this.defaultPath}${realPath}/${this.currentFile}`;
    const res = await fetch(fullUrl, {
      method: "POST",
      headers: {
        Authorization: this.token,
      },
    });
    if (!res.ok) {
      this.setErrorOccurred();
      console.log("some error accured when tried to move file");
      return;
    }
    await this.fetchFolderData("").then(() => {
      if (this.updatingInterface) this.toggleUpdatingInterface();
    });
  };

  /* 
  this thing right here MUST be changed
  it's giant, it's disgusting
  and under certian conditions
  it breaks EVERYTHING,
  and the reason why it is breaking
  everything is beyond my comprehension
  */


  deepSearchForPaths = async (items : Item[] | undefined) => {
    console.log("called deepsearch")
    if (items === undefined || items.length === 0) return;
    const paths : string[] = this.allFoldersPaths;
    for (const item of items) {
      if (item.type === "dir") {
        this.setAllFoldersPaths([...paths, this.defaultUrl + item.path.replace("disk:/", "")]);
        const obj : Item = await this.fetchJson(item.path.replace("disk:/", ""));
        console.log(obj._embedded?.items)
        this.deepSearchForPaths(obj._embedded?.items);
      }
    }
  }

  fetchFolderData = async (path: string) => {
    const result = await fetch(this.defaultUrl + path + this.limit, {
          method: "GET",
          headers: {
            Authorization: this.token,
          },
        });
    
    const objRes = await result.json();
    this.setAllFoldersMeta([...this.allFoldersMeta, objRes]);
    for (const item of objRes._embedded.items) {
      if (item.type === "dir") this.fetchFolderData(item.path.replace("disk:/", ""));
    }
    if (!this.authorized) this.toggleAuthorized();
    console.log(this.allFoldersMeta)
   }



  // fetchFolderData = async (path: string) => {
  //   const result = await fetch(this.defaultUrl + path, {
  //     method: "GET",
  //     headers: {
  //       Authorization: this.token,
  //     },
  //   });
  //   const objRes = await result.json();
  //   if (objRes._embedded) {
  //     this.deepSearchForPaths(objRes._embedded.items)
  //   }
  //   console.log(this.allFoldersPaths)
  //   if (!this.updatingInterface) this.toggleUpdatingInterface();
  //   console.log(this.allFoldersPaths)
  //   await this.fetchAllFoldersData(this.allFoldersPaths);
  //   if ("message" in objRes) {
  //     if ("description" in objRes) {
  //       if (objRes.description === "Resource not found.") {
  //         if (this.authorisationFailed) this.toggleAuthorisationFailed();
  //         if (!this.noSuchFolder) this.toggleNoSuchFolder();
  //         if (this.updatingInterface) this.toggleUpdatingInterface();
  //         return;
  //       } else if (objRes.description === "Unauthorized") {
  //         if (this.noSuchFolder) this.toggleNoSuchFolder();
  //         if (!this.authorisationFailed) this.toggleAuthorisationFailed();
  //         if (this.updatingInterface) this.toggleUpdatingInterface();
  //         return;
  //       }
  //       if (this.noSuchFolder) this.toggleNoSuchFolder();
  //       if (this.authorisationFailed) this.toggleAuthorisationFailed();
  //       if (this.updatingInterface) this.toggleUpdatingInterface();
  //       return;
  //     }
  //     if (this.noSuchFolder) this.toggleNoSuchFolder();
  //     if (this.authorisationFailed) this.toggleAuthorisationFailed();
  //   }
  //   if (path === "") {
  //     this.toggleAuthorized();
  //     this.setCategoriesMeta(objRes);
  //     if (this.updatingInterface) this.toggleUpdatingInterface();
  //   }
  //   this.setFolderMeta(objRes);
  // };

  fetchFilesData = async () => {
    const result = await fetch(this.filesPathUrl + this.limit.replace("&", "?"), {
      method: "GET",
      headers: {
        Authorization: this.token,
      },
    });
    if (!result.ok) {
      this.setErrorOccurred();
      console.log("some error accured when tried to fetch all files data");
      return;
    }
    const objRes = await result.json();
    this.setFilesMeta(objRes);
  };
}

export default new States();
