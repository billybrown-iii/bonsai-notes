import { SetStateAction, Dispatch } from "react";
import FolderRef from "../Classes/FolderRef";
import feather from "feather-icons";

const backIcon = feather.icons["corner-left-up"].toSvg({ "stroke-width": 2 });
const homeIcon = feather.icons["home"].toSvg({ "stroke-width": 2 });

type Props = {
  setSelectedPage: Dispatch<SetStateAction<string | null>>;
  path: string[];
  setPath: Dispatch<SetStateAction<string[]>>;
  parent: FolderRef;
};
const ParentFolder = ({ setSelectedPage, path, setPath, parent }: Props) => {
  return (
    <div
      id="parent-folder"
      onClick={() => {
        setSelectedPage(null);
        if (path.length > 1) setPath(path.slice(0, path.length - 1));
      }}
      className="flex items-center relative z-10 w-4/5 xl:w-[61%] rounded-br-2xl mr-3 py-3.5 px-2 bg-zinc-200 hover:bg-zinc-300 dark:bg-gray-700 dark:hover:bg-gray-600"
    >
      <div
        id="back-icon"
        className="relative mr-1.5"
        dangerouslySetInnerHTML={{
          __html: path.length > 1 ? backIcon : homeIcon,
        }}
      />
      <div className="text-xl">{" " + parent.folderToRef.title}</div>
    </div>
  );
};

export default ParentFolder;
