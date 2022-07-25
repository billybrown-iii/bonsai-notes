import { MenuItem } from "@szhsin/react-menu";
import feather from "feather-icons";
import SettingsButton from "./SettingsButton";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";

const icon = feather.icons["folder"].toSvg({
  "stroke-width": 2,
  width: "24px",
});
// const icon = ""
/** List of nodeRefs to be displayed in UI */
export default function NodeList({
  setPath,
  setSelectedPage,
  nodeRefs,
  addNode,
  deleteNode,
}) {
  const nodeStyles =
    "group flex w-5/6 ml-auto my-3 py-4 px-6 rounded-2xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600";

  const nodes = nodeRefs.map((item, index) => {
    if (item.path[0] === null) {
      return (
        <div className="w-3/4 m-auto">
          <div className={nodeStyles} key={index}>
            <input
              className="w-full m-auto border-2 border-zinc-500 rounded-xl dark:bg-zinc-600 py-2 px-5"
              type="text"
              placeholder="New Node"
              autoFocus
              onBlur={(e) => {
                addNode(e.target.value);
              }}
              onKeyPress={(e) => {
                //@ts-ignore
                if (e.key === "Enter") addNode(e.target.value);
              }}
            />
          </div>
        </div>
      );
    } else
      return (
        <div className="w-3/4 m-auto">
          <Xwrapper>
            <div
              onClick={() => {
                setSelectedPage(null);
                setPath(item.path);
              }}
              className={nodeStyles}
              id={"noderef-" + index}
              key={index}
            >
              <span
                className="mr-2"
                dangerouslySetInnerHTML={{ __html: icon }}
              />
              {item.title}
              <SettingsButton>
                <MenuItem onClick={() => deleteNode(item.title)}>
                  Delete
                </MenuItem>
              </SettingsButton>
            </div>
            <Xarrow
              start="back-beginning"
              end={"noderef-" + index}
              showHead={false}
              startAnchor="bottom"
              endAnchor="left"
              color="#eee"
              curveness={1.05}
              strokeWidth={1}
              path="grid"
            />
          </Xwrapper>
        </div>
      );
  });

  return <div className="pt-3 pb-3">{nodes}</div>;
}
