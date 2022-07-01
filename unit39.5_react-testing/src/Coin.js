import "./Coin.css";

function Coin({src, side}) {
    return (
        <div className="Coin">
            <img src={src} alt={side} />
        </div>
    )
}

export default Coin;