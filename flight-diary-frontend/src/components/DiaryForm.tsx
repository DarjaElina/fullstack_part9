import { useState } from 'react';
import diaryService from '../services/diaries';
import { DiaryFormProps } from '../types';
import { Visibility, Weather } from '../types';

import { isAxiosError } from 'axios';

const DiaryForm: React.FC<DiaryFormProps> = ({ diaries, setDiaries }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

 const visibilityOptions = Object.values(Visibility);
 const weatherOptions = Object.values(Weather);

  const addDiaryEntry = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const newDiary = await diaryService.createDiaryEntry({
        date,
        visibility,
        weather,
        comment
      })
      setDiaries(diaries.concat(newDiary));
    } catch (error) {
        if (isAxiosError(error)) {
        setErrorMessage(error.response?.data)
        setTimeout(() => {
          setErrorMessage('')
        }, 10000);
      } else {
        console.log(error)
      }
    } finally {
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
    }
  };


  return (
    <div>
      <h2>Add new entry</h2>
      {errorMessage && <p style={ { color: 'red' } }>{errorMessage}</p>}
      <form onSubmit={addDiaryEntry}>
        <div>
          date
          <input
            value={date}
            type="date"
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          Visibility:
          {visibilityOptions.map((o) => (
            <label key={o} htmlFor={o}>
              <input
                checked={visibility === o}
                key={o}
                name="visibility"
                type="radio"
                value={o}
                onChange={ ({ target }) => setVisibility(target.value) }
              />
              {o}
            </label>
          ))}
        </div>
        <div>
          Weather: 
          {weatherOptions.map((o) => (
            <label key={o} htmlFor={o}>
              <input
                checked={weather === o}
                key={o}
                name="weather"
                type="radio"
                value={o}
                onChange={ ({ target }) => setWeather(target.value) }
              />
              {o}
            </label>
          ))}
        </div>
       <div>
        comment
        <input
          value={comment}
          type="text"
          onChange={({ target }) => setComment(target.value)}
        />
       </div>
       <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default DiaryForm;