import ReactCreditCards from "react-credit-cards-2";

export function CraditCard(numberFrom) {
    
    return(
        <div style={{margin:"2rem"}}>
            <h1>אשראי</h1>
            <ReactCreditCards
                number={numberFrom}
                name="name"
                expiry="expiry"
                cvc="cvc"
                // focused={focused}
            />
<div style={{display:"grid",justifyContent:"center",margin:"2rem"}}>
    <input type="text" placeholder="name" />
    <button onClick={numberFrom}>שלח</button>
</div>
        </div>
    )
}