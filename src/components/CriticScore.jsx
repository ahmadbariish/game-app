const CriticScore = ({ score }) => {
    let color = score > 75 ? "green" : score > 60 ? "yellow" : "";
    console.log(color);
    return (
        <span className={`bg-${color}-800 text-${color}-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-${color} dark:text-${color}-300`}>
            {score}
        </span>
    );
};

export default CriticScore;
