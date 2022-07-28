import React, { ChangeEventHandler } from "react";

type Props = {
  pageTitle: string;
  titleChange: ChangeEventHandler<HTMLInputElement>;
  saveTitleChange: () => void;
};
const TitleBar = ({ pageTitle, titleChange, saveTitleChange }: Props) => {
  return (
    <input
      type="text"
      className="w-2/3 py-3 px-4 text-lg rounded-tr-xl border-x-2 border-t-2 border-[#eee] dark:bg-[#222f3e] dark:border-[#171f28] dark:text-zinc-50"
      id="title"
      value={pageTitle}
      onChange={titleChange}
      onBlur={saveTitleChange}
      onKeyPress={(e) => {
        if (e.key === "Enter") saveTitleChange();
      }}
    />
  );
};

export default TitleBar;
