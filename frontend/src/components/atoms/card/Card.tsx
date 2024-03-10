import "./Card.css";
export const Card = (props: { children: any }) => {
  const { children } = props;
  return <div className="card-container">{children}</div>;
};
