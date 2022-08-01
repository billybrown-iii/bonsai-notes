import feather from "feather-icons";
import SettingsButton from "./SettingsButton";
import { MenuItem } from "@szhsin/react-menu";
import PageRef from "../Classes/PageRef";
import { Dispatch, SetStateAction } from "react";

const pageIcon = feather.icons["file"].toSvg({
  "stroke-width": 2,
  width: "20px",
});

type Props = {
  pageRefs: PageRef[];
  addPage: (title: string) => void;
  selectedPage: string | null;
  // TODO generic
  setSelectedPage: Dispatch<SetStateAction<string | null>>;
  deletePage: (title: string) => void;
};
export default function PageList({
  pageRefs,
  addPage,
  selectedPage,
  setSelectedPage,
  deletePage,
}: Props) {
  const pageStyles =
    "group flex items-center w-full m-auto my-2.5 pl-3 pr-1 py-2.5 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600";

  const pages = pageRefs.map((item, index) => {
    // Condition for placeholder page
    if (item.path === null) {
      return (
        <div className={pageStyles} key={index}>
          <input
            className="w-full m-auto border-2 border-zinc-500 rounded-xl py-2 px-5 dark:bg-zinc-600"
            // TODO fix issue where you can click buttons when blurring
            id="new-pg"
            type="text"
            placeholder="New Page"
            autoFocus
            onBlur={(e) => {
              addPage(e.target.value);
            }}
            onKeyPress={(e) => {
              // @ts-ignore
              if (e.key === "Enter") addPage(e.target.value);
            }}
          />
        </div>
      );
    } else {
      return (
        <div
          onClick={() => {
            setSelectedPage(item.title);
          }}
          className={pageStyles}
          key={index}
        >
          {selectedPage === item.title ? (
            <span className="relative -left-7 h-2 w-2 rounded-full my-auto bg-sky-400"></span>
          ) : null}
          <span
            className="mr-2"
            dangerouslySetInnerHTML={{ __html: pageIcon }}
          />
          {item.title}
          <SettingsButton>
            <MenuItem onClick={() => deletePage(item.title)}>Delete</MenuItem>
          </SettingsButton>
        </div>
      );
    }
  });

  return <div id="page-list">{pages}</div>;
}
