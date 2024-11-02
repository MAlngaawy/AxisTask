import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Card = ({ children }: Props) => {
  return <div className="border rounded-lg p-4">{children}</div>;
};

export default Card;
