import { MenuItem } from "@szhsin/react-menu";
import feather from "feather-icons";
import SettingsButton from "./SettingsButton";

const icon = feather.icons["folder"].toSvg({
  "stroke-width": 2,
  width: "20px",
});
// const icon = ""
/** List of folderRefs to be displayed in UI */
export default function FolderList({
  setPath,
  setSelectedPage,
  folderRefs,
  addFolder,
  deleteFolder,
}) {
  const folderStyles =
    "group relative z-10 flex w-5/6 my-3 ml-auto pt-2 pb-1.5 px-6 text-[.95rem] rounded-2xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600";

  const folders = folderRefs.map((item, index) => {
    if (item.path[0] === null) {
      return (
        <div className="w-3/4 m-auto">
          <div className={folderStyles} key={index}>
            <input
              className="w-full m-auto border-2 border-zinc-500 rounded-xl dark:bg-zinc-600 py-2 px-5"
              type="text"
              placeholder="New Folder"
              autoFocus
              onBlur={(e) => {
                addFolder(e.target.value);
              }}
              onKeyPress={(e) => {
                //@ts-ignore
                if (e.key === "Enter") addFolder(e.target.value);
              }}
            />
          </div>
        </div>
      );
    } else
      return (
        <div className="w-3/4 m-auto">
            <div
              onClick={() => {
                setSelectedPage(null);
                setPath(item.path);
              }}
              className={folderStyles}
              id={"folderref-" + index}
              key={index}
            >
              <span
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
             className={"relative z-0 -my-12 bottom-[3.75rem] left-6 w-14 h-20 border-l-2 border-b-2 border-gray-500 " + (index === folderRefs.length - 1 ? "rounded-bl-xl" : "")}
            />
        </div>
      );
  });

  return <div className="pt-3 pb-3">{folders}</div>;
}
