import Card from "./Card";

const ActionCard = ({ title, description }) => {
  return (
    <Card className="card-hover cursor-pointer">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-text-muted">{description}</p>
    </Card>
  );
};

export default ActionCard;
