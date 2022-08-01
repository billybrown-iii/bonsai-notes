import feather from "feather-icons";
import { Menu } from "@szhsin/react-menu";
import React, { ReactNode } from "react";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const settingsIcon = feather.icons["settings"].toSvg({
  "stroke-width": 2,
  width: "20px",
});

/**
 * Wrapper for settings button
 * Provides outer skeleton.  Implementation still to add individual menu items for settings.
 */
type Props = {
  children?: ReactNode;
};
const SettingsButton = ({ children }: Props) => {
  return (
    <div
      className="invisible group-hover:visible h-fit ml-auto mr-1 -my-1 text-slate-600 hover:bg-gray-400 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-gray-500 dark:hover:text-slate-200 rounded-md"
      onClick={(e) => e.stopPropagation()}
    >
      <Menu
        menuButton={
          <div
            className="p-1 px-1.5"
            dangerouslySetInnerHTML={{ __html: settingsIcon }}
          />
        }
        transition
        portal={true}
        offsetX={20}
        offsetY={-2}
      >
        {children}
      </Menu>
    </div>
  );
};

export default SettingsButton;
