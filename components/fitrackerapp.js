import React, { useEffect, useState } from "react";
import Greeting from './Greeting'
import History from './History'
import Input from './Input'
import InputFit from "./InputFit";
import BurnedHistory from './BurnedHistory';
import InputInfo from './InputInfo';
import { supabase } from '../utils/supabaseClient';

export default function Fitrackerapp({ user }) {

    const [calorieentry, setCalorieEntry] = useState([]);
    const [calorieburned, setCalorieBurned] = useState([]);
    const [userinfo, setUserInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalCal, setTotalCal] = useState(0);
    const [burnedCal, setBurnedCal] = useState(0);
    const [isUser, setUser] = useState(true);
    const [goalDifference, setGoalDifference] = useState(0);
  
    useEffect(() => {
      setTotalCal(0)
      setBurnedCal(0)
      fetchInfo()
      fetchBurned()
      fetchCalories()
    }, [loading])

    const fetchInfo = async () => {
      let { data: userinfo, error } = await supabase
        .from('userinfo')
        .select('entry, date_insert_ts')

      if(!error) {
        let arr3 = []
        let today3 = new Date()
        var date3 = today3.getFullYear()+'-'+(today3.getMonth()+1)+'-'+today3.getDate();
        let day3 = date3.substring(8,10)
        console.log("USER INFO")
        console.log(userinfo)
        for(let k = 0; k < userinfo.length; k++) {
          let num = userinfo[k].date_insert_ts.substring(8,10)
          if(day3 == num) {
            arr3.push(userinfo[k].entry)
            setUserInfo(arr3)
            setUser(false)
          } else {
            console.log("FOR SOME REASON IT DO BE HERE")
            setUser(true)
          }
        }
        setUserInfo(arr3)
        setGoalDifference(arr3)
        setLoading(false)
      } else {
        console.log(error)
        setLoading(false)
        setError(error)
      }
    }

    const fetchBurned = async () => {
        let { data: calorieburned, error } = await supabase
        .from('calorieburned')
        .select('entry, date_insert_ts')

        if(!error) {
          let today2 = new Date()
          var date2 = today2.getFullYear()+'-'+(today2.getMonth()+1)+'-'+today2.getDate();
          let day2 = date2.substring(8,10)
          let arr2 = []
          for(let j = 0; j < calorieburned.length; j++) {
            let n = calorieburned[j].date_insert_ts.substring(8,10)
            if(day2 == n) {
              arr2.push(calorieburned[j])
              let currCal2 = calorieburned[j].entry
              setBurnedCal(burnedCal += currCal2)
            }
          }
          setCalorieBurned(arr2)
          setLoading(false)
        } else {
          console.log(error)
          setLoading(false)
          setError(error)
        }
    }
  
    const fetchCalories = async () => {
  
      let { data: calorieentry, error } = await supabase
        .from('calorieentry')
        .select('entry, date_insert_ts')

        if (!error) {
          let today = new Date()
          var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          let day = date.substring(8,10)
          let arr = []
          for(let i = 0; i < calorieentry.length; i++) {
            let s = calorieentry[i].date_insert_ts.substring(8,10)
            if(day == s) {
              arr.push(calorieentry[i])
              let currCal = calorieentry[i].entry
              setTotalCal(totalCal += currCal)
            }
          }
          setCalorieEntry(arr)
          setLoading(false)
        } else {
          console.log(error)
          setLoading(false)
          setError(error)
        }
    }
  
    const addEntry = async (entry) => {
      const { data, error } = await supabase
        .from('calorieentry')
        .insert([
          { id: user.id, entry: entry },
      ])
      setTotalCal(0)
      setLoading(true)
      if (error) { 
        console.log(error)
        setError(error) 
      } else {
        setLoading(false)
      }
    }

    const addBurned = async (entry) => {
      const { data, error } = await supabase
        .from('calorieburned')
        .insert([
          { id: user.id, entry: entry },
      ])
      setBurnedCal(0)
      setLoading(true)
      if (error) { 
        console.log(error)
        setError(error) 
      } else {
        setLoading(false)
      }
    }

    const addGoal = async (entry) => {
      const { data, error } = await supabase
        .from('userinfo')
        .insert([
          { id: user.id, entry: entry },
      ])
      setLoading(true)
      setUser(false)
      if (error) { 
        console.log(error)
        setUser(true)
        setError(error) 
      } else {
        setLoading(false)
      }
    }

    if (loading) {
      return <p>Loading...</p>
    }
    if (error) {
      return <p>{error}</p>
    }
  
    return (
      <div>
          {
            isUser ? (
            <span>
                <Greeting 
                user = {user}
                ></Greeting>

                <InputInfo
                  handleSubmit= { addGoal }
                >
                </InputInfo>
              </span>
            ) : (
            <main>
              <h1>FiTracker</h1>
              <Greeting 
                user = {user}
              ></Greeting>
              
              <p>Calorie Goal: { userinfo }</p>
              <p>Today's Calories Consumed: {totalCal}</p>
              <Input 
                handleSubmit = { addEntry }
              >
              </Input>
              <History
                calorieentry = { calorieentry }
              ></History>
              <p>Today's Calories Burned: { burnedCal }</p>
              <InputFit
                handleSubmit = { addBurned }
              >
              </InputFit>
              <BurnedHistory
                calorieburned={ calorieburned }
              >
              </BurnedHistory>
              <p>Today's Calorie Difference: {totalCal - burnedCal}</p>
              {
                goalDifference >= totalCal - burnedCal ? (
                  <p>You are meeting your daily goal! You are currently: {goalDifference - (totalCal - burnedCal)} calories below!</p>
                ) : (
                  <p>You are above your daily goal by {(goalDifference - (totalCal - burnedCal))*-1} calories. Try to go burn that off!</p>
                )
              }
            </main>
          )
        }
        <style jsx>{`
              div {
                display: flex;
                justify-content: center;
                padding: 10px;
                margin: 0px;
                max-width: 450px;
                border-style: solid;
                border-radius: 20px 20px 0px 0px;
                border-color: #10B203;
                overflow-wrap: normal;
              }

              p {
                display: flex;
                justify-content: center;
                color: white;
                overflow-wrap: normal;
              }

              h1 {
                display: flex;
                justify-content: center;
                font-size: 5rem;
                margin-bottom: 0;
                color: #10B203;
                font-weight: bold;
              }
            `}</style>
      </div>
    )
  }