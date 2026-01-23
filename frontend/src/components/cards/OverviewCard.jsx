import Card from "./Card";

const OverviewCard = ({ title, description }) => {
    return (
        <Card>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-text-muted">{description}</p>
        </Card>
    );
};

export default OverviewCard;
