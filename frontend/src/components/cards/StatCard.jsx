import Card from "./Card";

const StatCard = ({ label, value, variant }) => {
    return (
        <Card className={`stat-${variant} relative overflow-hidden`}>
            <div className="absolute right-4 top-4 opacity-20 text-6xl font-bold">#</div>
            <p className="text-sm opacity-90">{label}</p>
            <h2 className="text-4xl font-bold mt-2">{value}</h2>
        </Card>
    );
};

export default StatCard;
