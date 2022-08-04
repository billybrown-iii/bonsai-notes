type Props = {
  icon: string;
  func: () => any;
  text: string;
};
const ResponsiveButton = ({ icon, func, text }: Props) => {
  return (
    <div
      onClick={func}
      className="flex w-fit items-center p-1 px-2 rounded-lg text-sm border border-gray-400 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700"
    >
      <div
        className="mr-0 xl:mr-1.5 text-gray-300"
        dangerouslySetInnerHTML={{ __html: icon }}
      ></div>
      <div className="hidden xl:block text-gray-200">{text}</div>
    </div>
  );
};

export default ResponsiveButton;
