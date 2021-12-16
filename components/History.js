export default function History({ calorieentry }) {
    console.log("History arr")
    console.log(calorieentry)
    return (
        <div>
            {
                calorieentry.length > 0 ? (
                    <p className="text-white text-2xl">Calories Today: <span className="font-bold">{calorieentry.map(g => ' ' + g.entry)}</span></p>
                ) : (
                    <p className="text-white text-2xl">No Calories Entered Today</p>
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