type Props = {
  text: string;
};

const PageTitle = ({ text }: Props) => {
  return <h1 className="text-2xl text-gray-800 font-black my-4">{text}</h1>;
};

export default PageTitle;
