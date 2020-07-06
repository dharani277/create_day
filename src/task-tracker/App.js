import "./app.css";
import React, { useState } from "react";
import Nav from "./Nav";
import NewCard from "./NewCard";
import Tracker from "./Tracker";

const App = () => {
  const [days, setDays] = useState([]);

  const [state, setState] = useState("VIEW");

  const createDay = (value) => {
    // value shoud be day title

    const newDay = {
      title: value,
      tasks: [],
    };

    setDays(days.concat([newDay]));
    setState("VIEW");
  };

  const createTask = (dayIndex, value) => {
    // value shoud be task title

    const newTask = {
      title: value,
      completed: false,
    };

    const newDays = days.map((day, index) => {
      if (index === dayIndex) {
        let newObj = JSON.parse(JSON.stringify(day));
        newObj.tasks = day.tasks.concat([newTask]);
        return newObj;
      } else {
        return day;
      }
    });

    setDays(newDays);
  };

  const deleteTask = (dayIndex, taskIndex) => {
    setDays(
      days.map((day, index) => {
        if (index === dayIndex) {
          return {
            ...day,
            tasks: day.tasks.filter((task, index) => {
              if (index === taskIndex) {
                return false;
              } else return true;
            }),
          };
        }
        return day;
      })
    );
  };

  const toggleTask = (dayIndex, taskIndex) => {
    setDays(
      days.map((day, index) => {
        if (index === dayIndex) {
          return {
            ...day,
            tasks: day.tasks.map((task, index) => {
              if (index === taskIndex) {
                return { ...task, completed: !task.completed };
              } else return task;
            }),
          };
        }
        return day;
      })
    );
  };
  return (
    <div>
      {state === "VIEW" ? (
        <React.Fragment>
          <Nav showCardMenu={() => setState("CREATE_DAY")} />
          <Tracker
            days={days}
            createTask={createTask}
            toggleTask={toggleTask}
            setDays={setDays}
            deleteTask={deleteTask}
          />
        </React.Fragment>
      ) : (
        <NewCard
          onSave={createDay}
          onCancel={() => {
            setState("VIEW");
          }}
        />
      )}
    </div>
  );
};

export default App;
