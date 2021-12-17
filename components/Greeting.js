export default function Greeting({user, calorieEntries}) {
    return (
        <div>
            <h1 className="text-white text-6xl">
                Welcome, <span className="text-indigo-400">{user.email}</span>!
            </h1>
            <style jsx>{`
              div {
                display: flex;
                justify-content: center;
              }

              h1 {
                  color: white;
                  margin-bottom: 0px;
              }
            `}</style>
        </div>
    )
}