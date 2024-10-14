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
  defaultUrl: string = "https://cloud-api.yandex.net/v1/disk/resources?path=";
  defaultPath: string = "CaseLabDocuments";

  // dynamic path value
  currentPath: string = "CaseLabDocuments";


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
  popupX : number = 0;
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
  rootFolder : boolean = true;

  pending : boolean = false;
  updatingInterface : boolean = false;

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
  togglePending = () => {
    this.pending = !this.pending;
  }
  togglePopupShowing = () => {
    this.popupShowing = !this.popupShowing;
  }
  toggleMoveOptionSelected = () => {
    this.moveOptionSelected = !this.moveOptionSelected;
  }
  toggleUpdatingInterface = () => {
    this.updatingInterface = !this.updatingInterface;
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
  setAllFoldersPaths = (paths : string[]) => {
    this.allFoldersPaths = paths;
  };
  setAllFoldersMeta = (arr: Item[]) => {
    this.allFoldersMeta = structuredClone(arr);
  }
  setCurrentPath = (path: string) => {
    this.currentPath = path;
  };


  setCurrentFile = (fileName : string) => {
    this.currentFile = fileName;
  }
  setPopupX = (x : number) => {
    this.popupX = x;
  }

  setPopupY = (y : number) => {
    this.popupY =y;
  }



  //async
  fetchJson = async (path : string) => {
    const res = await fetch(path, {
      method: "GET",
      headers: {
        Authorization: this.token,
      },
    });
    if (!res.ok) {
      console.log("some error during fetch");
      return;
    }
    const obj = await res.json();
    return obj;
  }

  fetchAllFoldersData = async (collection : string[]) => {
    this.togglePending();
    const allData = await Promise.all(collection.map(url => this.fetchJson(url)));
    this.setAllFoldersMeta(allData);
    this.togglePending();
  }
  
  deleteFile = async (path: string) => {
    const res = await fetch(this.defaultUrl + path, {
      method: "DELETE",
      headers: {
        Authorization: this.token,
      },
    });
    if (!res.ok) {
      console.log("some error while trying to delete a file");
      return;
    }
    await this.fetchFolderData("");
    await this.fetchFilesData().then(() =>  {
      if (this.updatingInterface) this.toggleUpdatingInterface();
    });
  }
  

  
  
  fetchFolderData = async (path: string) => {
    const result = await fetch(this.defaultUrl + this.currentPath, {
      method: "GET",
      headers: {
        Authorization: this.token,
      },
    });
    const objRes = await result.json();
    
    const paths : string[] = [];
    for (const item of objRes._embedded.items) {
      if (item.type === "dir") {
        paths.push(this.defaultUrl + item.path.replace("disk:/", ""))
      }
    }
    this.setAllFoldersPaths(paths);
    if (!this.updatingInterface) this.toggleUpdatingInterface();
    await this.fetchAllFoldersData(this.allFoldersPaths);
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
      if (this.authorisationFailed) this.toggleAuthorisationFailed()
    }
    if (path === "") {
      this.toggleAuthorized();
      this.setCategoriesMeta(objRes);
      if (this.updatingInterface) this.toggleUpdatingInterface();
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
