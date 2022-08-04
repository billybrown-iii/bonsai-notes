type Props = {
  icon: string;
  func: () => any;
  text: string;
};
const FullButton = ({ icon, func, text }: Props) => {
  return (
    <div
      onClick={func}
      className="flex w-fit items-center p-1 px-2 rounded-lg text-sm border border-gray-400 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700"
    >
      <div
        className="mr-1.5 text-gray-300"
        dangerouslySetInnerHTML={{ __html: icon }}
      ></div>
      <div>{text}</div>
    </div>
  );
};

export default FullButton;
