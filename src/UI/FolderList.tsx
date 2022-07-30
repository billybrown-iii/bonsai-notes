import { MenuItem } from "@szhsin/react-menu";
import feather from "feather-icons";
import { Dispatch, SetStateAction } from "react";
import FolderRef from "../Classes/FolderRef";
import SettingsButton from "./SettingsButton";

const icon = feather.icons["folder"].toSvg({
  "stroke-width": 2,
  width: "20px",
});

type Props = {
  setPath: Dispatch<SetStateAction<string[]>>;
  setSelectedPage: Dispatch<SetStateAction<string | null>>;
  folderRefs: FolderRef[];
  addFolder: (title: string) => void;
  deleteFolder: (title: string) => void;
};

/** List of folderRefs to be displayed in UI */
export default function FolderList({
  setPath,
  setSelectedPage,
  folderRefs,
  addFolder,
  deleteFolder,
}: Props) {
  const folderStyles =
    "group relative z-10 flex items-center w-3/4 my-3.5 ml-auto mr-4 py-1.5 px-6 text-sm rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600";

  const folders = folderRefs.map((item, index) => {
    if (item.isNew) {
      return (
        <div className="w-7/12 m-auto" key={index}>
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
        <div className="w-7/12 m-auto" key={index}>
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
            <SettingsButton>
              <MenuItem onClick={() => deleteFolder(item.title)}>
                Delete
              </MenuItem>
            </SettingsButton>
          </div>
          <div
            id="line"
            className={
              "relative z-0 -my-12 bottom-16 left-5 w-14 h-20 border-l-2 border-b-2 border-gray-500 " +
              (index === folderRefs.length - 1 ? "rounded-bl-lg" : "")
            }
          />
        </div>
      );
  });

  return <div className="pt-3 pb-3">{folders}</div>;
}
