import React from "react";

export const CreateNewBoard: React.FC = () => {
  return <div>
    <h1>Create new board</h1>
    <form>
      <div><label className="flex"><span >Board Name</span>
        #<input type="text" className="flex-1"></input>
      </label></div>
      <div><label className="flex"><span>Description</span>
        <textarea className="flex-1"></textarea>
      </label></div>
      <button>Create</button>
    </form>
  </div>

}