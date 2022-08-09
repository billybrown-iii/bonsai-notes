import { MenuItem } from "@szhsin/react-menu";
import feather from "feather-icons";
import { Dispatch, SetStateAction } from "react";
import FolderRef from "../Classes/FolderRef";
import PageRef from "../Classes/PageRef";
import SettingsButton from "./SettingsButton";

const icon = feather.icons["folder"].toSvg({
  "stroke-width": 1,
  width: "20px",
});

type Props = {
  setPath: Dispatch<SetStateAction<string[]>>;
  setSelectedPage: Dispatch<SetStateAction<string | null>>;
  folderRefs: FolderRef[];
  pageRefs: PageRef[];
  addFolder: (title: string) => void;
  deleteFolder: (title: string) => void;
};

/** List of folderRefs to be displayed in UI */
export default function FolderList({
  setPath,
  setSelectedPage,
  folderRefs,
  pageRefs,
  addFolder,
  deleteFolder,
}: Props) {
  const folderStyles =
    "group relative z-10 flex items-center w-full my-3.5 p-1.5 pl-3 text-sm rounded-xl bg-zinc-200 hover:bg-zinc-300 dark:bg-gray-700 dark:hover:bg-gray-600";

  const folders = folderRefs.map((item, index) => {
    if (item.isNew) {
      return (
        <div className="w-3/5 ml-8 mr-auto" key={index}>
          <div className={folderStyles}>
            <input
              className="w-full m-auto border-2 border-zinc-500 rounded-xl dark:bg-zinc-600 py-2 px-5"
              type="text"
              placeholder="New Folder"
              autoFocus
              onBlur={(e) => {
                addFolder(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") addFolder(e.target.value);
              }}
            />
          </div>
        </div>
      );
    } else
      return (
        <div className="group flex items-center w-3/4 xl:w-3/5 mr-10">
          <div className="w-full ml-8" key={index}>
            <div
              onClick={() => {
                setSelectedPage(null);
                setPath(item.path);
              }}
              className={folderStyles}
              id={"folderref-" + index}
            >
              <div
                className="mr-2 -mt-0.5"
                dangerouslySetInnerHTML={{ __html: icon }}
              />
              {item.title}
            </div>
            <div
              id="line"
              className={
                "relative z-0 -my-12 bottom-16 right-3 w-14 h-20 border-l-2 border-b-2 border-neutral-300 dark:border-gray-700" +
                (pageRefs.length === 0 &&
                (index === folderRefs.length - 1 ||
                  (index === folderRefs.length - 2 &&
                    folderRefs[folderRefs.length - 1].isNew))
                  ? " rounded-bl-lg"
                  : "")
              }
            />
          </div>
          <div className="relative z-10 top-2 w-fit">
            <SettingsButton>
              <MenuItem onClick={() => deleteFolder(item.title)}>
                Delete
              </MenuItem>
            </SettingsButton>
          </div>
        </div>
      );
  });

  return <div className="pb-3">{folders}</div>;
}
