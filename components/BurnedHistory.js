export default function BurnedHistory({ calorieburned }) {
    return (
        <div>
            {
                calorieburned.length > 0 ? (
                    <p className="text-white text-2xl">Calories Burned Today: <span className="font-bold">{calorieburned.map(g => ' ' + g.entry)}</span></p>
                ) : (
                    <p className="text-white text-2xl">No Calories Burned Today</p>
                )
            }
            <style jsx>{`
                div {
                display: flex;
                justify-content: center;
                }
            `}</style>
        </div>
    )
}