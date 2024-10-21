import { makeAutoObservable } from "mobx";
import { FolderMetaInterface } from "./types";
import { ErrorObject } from "./types";
import { Item } from "./types";

interface Items {
  items: Item[];
}

class States {
  // hardcoded  values
  filesPathUrl: string = "https://cloud-api.yandex.net/v1/disk/resources/files";
  defaultUrl: string = "https://cloud-api.yandex.net/v1/disk/resources?path=/";
  SMALL_IMG_INDEX: number = 5;
  BIG_IMG_INDEX : number = 0;
  LIMIT: string = "1000";
  defaultPath: string = "";

  // dynamic path value
  currentPath: string = "/";

  // files/paths
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

  fileExistsError: boolean = false;
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

  toggleHideRules = () => {
    this.hideRules = !this.hideRules;
  };
  toggleFileExistsError = () => {
    this.fileExistsError = !this.fileExistsError;
  }
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

  deleteFile = async (path: string) => {
    const url : string = "https://cloud-api.yandex.net/v1/disk/resources?path=";
    const res = await fetch(url + path, {
      method: "DELETE",
      headers: {
        Authorization: this.token,
      },
    });
    if (!res.ok) {
      console.log("some unknown error occured when tried to move the file");
      this.setErrorOccurred();
      return new Promise((resolve, reject) => reject("error"));
    }
    return new Promise(resolve => resolve(1));
  };

  moveFile = async (path: string) => {
    if (!this.updatingInterface) this.toggleUpdatingInterface();
    const url = "https://cloud-api.yandex.net/v1/disk/resources/move?";
    const from = "from=";
    const to = "&path=";
    const fullUrl = `${url}${from}${this.currentPath === "" ? this.currentPath : "/" + this.currentPath}/${this.currentFile}${to}${this.defaultPath}${path === "/" ? path : path + "/"}${this.currentFile}`;
    const res = await fetch(fullUrl, {
      method: "POST",
      headers: {
        Authorization: this.token,
      },
    });
    if (!res.ok) {
      if (res.status === 409) {
        console.log("oops, file already exists");
        this.toggleFileExistsError();
        setTimeout(() => {
              if (this.fileExistsError) {
                this.toggleFileExistsError();
                this.toggleUpdatingInterface();
              }
          }, 7000);
        return new Promise ((resolve, reject) => reject(409));
      } else {
        this.setErrorOccurred();
        console.log("some unknown error occured when tried to move the file");
        return new Promise ((resolve, reject) => reject("error"));
      }
    }
    return new Promise(resolve => resolve(1));
  };
  updateFoldersDataAfterMoveOrDelete = (arrFiles: Items, arrFolders : Item[], path : string, action: string) => {
    const temp : Item[] = arrFolders;
    const tempFiles : Items = arrFiles;
    let targetItem : Item | null = null;
    // delete item from allFoldersMeta
    for (let i = 0; i < temp.length; i++) {
      const item = temp[i];
      if (item._embedded) {
        for (let j = 0; j < item._embedded.items.length; j++) {
          const current = item._embedded.items[j];
          if (current.name === this.currentFile) {
            targetItem = current;
            item._embedded.items.splice(j, 1);
            break;
          }
        }
        if (targetItem) break;
      }
    }
    // move deleted file to another folder if action = move
    if (action === "move") {
      for (const item of temp) {
        if (item.path === "disk:" + path)   {
          if (item._embedded && targetItem) item._embedded.items.push(targetItem);
          break;
        }
        }
    }
    // delete file from allFiles too if action = delete
    if (action === "delete") {
      for (let i = 0; i < tempFiles.items.length; i++) {
        const item = tempFiles.items[i];
        if (item.name === this.currentFile) {
          tempFiles.items.splice(i, 1);
          break
        }
        this.setFilesMeta(tempFiles);
        
      }
    }
    this.setAllFoldersMeta(temp);
  }

  authorize = async(path: string) => {
    if (!this.updatingInterface) this.toggleUpdatingInterface();
    const result = await fetch(this.defaultUrl + path, {
          method: "GET",
          headers: {
            Authorization: this.token,
          },
        });
      const objRes = await result.json();
      if ("message" in objRes) {
        if ("description" in objRes) {
          if (objRes.description === "Unauthorized") {
            if (!this.authorisationFailed) this.toggleAuthorisationFailed();
            if (this.updatingInterface) this.toggleUpdatingInterface();
            return new Promise((resolve, reject) => reject("failed to authorize"));
          }
        }
      }
      if (this.authorisationFailed) this.toggleAuthorisationFailed();
      if (this.updatingInterface) this.toggleUpdatingInterface();
      return new Promise(resolve => resolve(1));
  }


  fetchFolderData = async (path: string) => {
    if (!this.updatingInterface) this.toggleUpdatingInterface();
    const objRes = await fetch(this.defaultUrl + path + "&limit=" + (Number(this.LIMIT) / 5).toString(), {
          method: "GET",
          headers: {
            Authorization: this.token,
          },
        }).then(res => res.json())
    this.setAllFoldersMeta([...this.allFoldersMeta, objRes]);
    const pathsToFetch : string[] = []; 
    for (const item of objRes._embedded.items) {
      if (item.type === "dir") pathsToFetch.push(item.path.replace("disk:/", ""));
    }
    await Promise.all(pathsToFetch.map(url => this.fetchFolderData(url)));
    return new Promise((resolve) => resolve("success"));
   }

  fetchFilesData = async () => {
    const result = await fetch(this.filesPathUrl + "?limit=" + this.LIMIT, {
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
