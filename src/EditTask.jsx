import React, { useState } from 'react';

const EditTask = ({ id, text, editTodo}) => {

    const [taskName, setTaskName] = useState(text);


  return (
    <div className='flex justify-center flex-col'>
      {/* <p className={`${checked ? 'text-green-500' : 'text-red-500'}`}>id is {id}, Text is {text}, checked is {checked.toString()}</p> */}
      <input className="bg-cyan-500 flex justify-center" value={taskName} onKeyDown={(e) => {if(e.key === "Enter") {editTodo(id, taskName)}}} onChange={(e) => setTaskName(e.target.value)}></input>
    </div>
  );
};

export default EditTask;