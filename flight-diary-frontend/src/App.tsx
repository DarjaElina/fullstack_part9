import { useState, useEffect } from 'react';
import Diaries from './components/Diaries';
import DiaryForm from './components/DiaryForm';
import diaryService from './services/diaries';

import { NonSensitiveDiaryEntry} from './types';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll()
      .then(data => setDiaries(data))
  }, [])

  return (
    <>
      <DiaryForm
        diaries={diaries}
        setDiaries={setDiaries}
      />
      <Diaries diaries={diaries} />
    </>
  )
}

export default App;