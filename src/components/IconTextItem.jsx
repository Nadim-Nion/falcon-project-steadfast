/* eslint-disable no-unused-vars */
const IconTextItem = ({ icon: Icon, text = "" }) => {
  return (
    <li className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-gray-800" />
      </div>
      <span className="text-white font-light ml-2">{text}</span>
    </li>
  );
};

export default IconTextItem;
