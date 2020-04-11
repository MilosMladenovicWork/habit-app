import React, {useState, useEffect} from 'react'
import calendarize from 'calendarize'
import groupArray from 'group-array'

import './calendar.css'
import OutShadowContainer from './outshadowcontainer'

function Calendar({
  habitDates,
  setHabits,
  selectedHabit,
  habits
}){
  
  const [dateArray, setDateArray] = useState([])
  const [groupedDateObject, setGroupedDateObject] = useState()
  const [calendars, setCalendars] = useState()

  useEffect(() => {
    setDateArray(() => {
      let dates = habitDates && [...habitDates]
      let array = []
      dates && dates.map((date) => {
        let day = new Date(date).getDate()
        let month = new Date(date).getMonth()
        let year = new Date(date).getFullYear()
        let datePlain = date
        array.push({
          year,
          month,
          day,
          datePlain
        })
      })
      return array
    })
  }, [habitDates])

  useEffect(() => {
    let newArray = dateArray && [...dateArray]
    newArray && setGroupedDateObject(groupArray(newArray, 'year', 'month', 'day'))
  }, [dateArray])

  useEffect(() => {
    groupedDateObject && setCalendars(() => {
      let calendarsArr = []

      const years = Object.keys(groupedDateObject)

      years.forEach(year => {
        let months = Object.keys(groupedDateObject[year])

        months.forEach(month => {
          let days = Object.keys(groupedDateObject[year][month])
          let day = days[0]

          calendarsArr.unshift([
            {date:`${month}/1/${year}`},
            ...calendarize(groupedDateObject[year][month][day] && new Date(groupedDateObject[year][month][day][0].datePlain), 1)
          ])
        })
      })
      
      return calendarsArr
    })
  }, [groupedDateObject])

  return(
    <d>
      {calendars && calendars.map(calendar => {
        return <OutShadowContainer>
        <table className='calendar'>
          <th>
            {
            `${new Date(calendar[0].date).getMonth() + 2}/${new Date(calendar[0].date).getFullYear()}`
            }
          </th>
          {
            calendar.map(week => {
              if(!(week instanceof Array)){
                return
              }
              return <tr>
                {week.map(day => {
                  function checkCompleted(day){
                    let daysObject = groupedDateObject[new Date(calendar[0].date).getFullYear()][new Date(calendar[0].date).getMonth() + 1]
                    let daysArray = daysObject && Object.keys(daysObject)
                    let dayExist = daysArray && daysArray.find((dateDay) =>dateDay == day)
                    let habit = habits.filter(habit => habit.title === selectedHabit)[0]
                    let dateEntry = habit && habit.completed.filter(completedEntry => {return completedEntry.date == `${new Date(calendar[0].date).getMonth() + 2}/${day}/${new Date(calendar[0].date).getFullYear()}`})

                    if(dayExist && dateEntry && dateEntry[0].completed){
                      return true
                    }
                  }

                  if(day === 0){
                    return <td style={{opacity:0}}>{day}</td>
                  }
                    return <td
                    className='disable-selection'
                    onClick={(e) => {
                      let habitDay = e.target.innerHTML
                      setHabits((prevState) => {
                        let newArray = [...prevState]
                        newArray.forEach(habit => {
                          if(habit.title === selectedHabit){                
                            if(habit.completed.filter(completedEntry => completedEntry.date === `${new Date(calendar[0].date).getMonth() + 2}/${habitDay}/${new Date(calendar[0].date).getFullYear()}`)[0]){
                              habit.completed.forEach((date, index) => {
                                if(date.date === `${new Date(calendar[0].date).getMonth() + 2}/${habitDay}/${new Date(calendar[0].date).getFullYear()}`){
                                  habit.completed[index].completed = !habit.completed[index].completed
                                }
                              })
                            }else{                        
                              habit.completed.push({
                                date:`${new Date(calendar[0].date).getMonth() + 2}/${habitDay}/${new Date(calendar[0].date).getFullYear()}`,
                                completed:true
                              })
                            }
                          }
                        })
                        localStorage.setItem('habits', JSON.stringify(newArray))
                        return newArray
                      })
                    }}
                      style={{
                      boxShadow:checkCompleted(day) ? "inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px rgba(255, 255, 255, 1)" : "none",
                      borderRadius:'10px'
                    }}>{day}</td>
                  
                })}
              </tr>
            })
          }
        </table>
    </OutShadowContainer>
      })}
      </d>
  )
}

export default Calendar