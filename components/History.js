export default function History({ calorieentry }) {
    return (
        <div>
            {
                calorieentry.length > 0 ? (
                    <p>Calorie Entries Today: <span>{calorieentry.map(g => ' ' + g.entry)}</span></p>
                ) : (
                    <p>No Calories Entered Today</p>
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