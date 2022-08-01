type Props = {
  icon: string;
  func: () => void;
};
const MiniButton = ({ icon, func }: Props) => {
  return (
    <div
      onClick={func}
      className="flex w-fit p-2 border rounded-lg border-zinc-800 dark:border-slate-100 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <div dangerouslySetInnerHTML={{ __html: icon }}></div>
    </div>
  );
};

export default MiniButton;

// Maybe:
// Make a MedButton as well, for the more central actions like new page
