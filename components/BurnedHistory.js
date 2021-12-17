export default function BurnedHistory({ calorieburned }) {
    return (
        <div>
            {
                calorieburned.length > 0 ? (
                    <p>Calories Burned Today: <span>{calorieburned.map(g => ' ' + g.entry)}</span></p>
                ) : (
                    <p>No Calories Burned Today</p>
                )
            }
            <style jsx>{`
                div {
                    display: flex;
                    justify-content: center;
                }

                p {
                    color: white;
                    overflow-wrap: normal;
                }
            `}</style>
        </div>
    )
}