import "./areaCard.scss";

const AreaCard = ({ cardInfo }) => {
    return (
        <div className="area-card">
            <div className="area-card-info">
                <h5 className="info-title">{cardInfo.name}</h5>
                <div className="info-value">{cardInfo.value}</div>
                <p className="info-text">{cardInfo.text}</p>
            </div>
        </div>
    )
}

export default AreaCard