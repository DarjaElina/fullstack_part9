import { NonSensitiveDiaryEntry } from "../types";

const Diaries = ({diaries}: {diaries: NonSensitiveDiaryEntry[]}) => {
  return (
    <div>
      <h2>Diary Entries</h2>
      {diaries.map(d => (
        <div key={d.id}>
          <h4>{d.date}</h4>
          <p>visibility: {d.visibility}</p>
          <p>weather: {d.weather}</p>
        </div>
      ))}
    </div>
  )
}

export default Diaries;