import React, { useEffect } from "react";
import { Form } from "react-router-dom";
import { useActionData } from "react-router-dom";
import { createGame } from "../../utils/gameApi";
import { IGame } from "../../utils/models";
import toast, { Toaster } from 'react-hot-toast';
export async function action({ request }) {
  const formData = await request.formData();
  const gameData = Object.fromEntries(formData) as IGame;
  const gameResponse = await createGame(gameData);
  const game=await gameResponse?.json()
  
  if(gameResponse?.status===201){
    toast.success(gameResponse?.statusText??"")
  }
  else{
    const errorMessage=gameResponse?.statusText +". "+game.error??undefined
    toast.error(errorMessage?? "There was an error.")
  }
  return game ?? {};
}
export const AdminGame = () => {
  useEffect(()=>{  toast.remove()
  },[])
  return (
    <div>
      <Toaster/>
      <Form method="post">
        <label>
          <span>Game Name </span>
          <input name="name" required={true} max={128}  type="text" />
        </label>
        <label>
          <span>Game Publisher </span>
          <input name="publisher" max={128} type="text" />
        </label>
        <label>
          <span>Game Description </span>
          <input name="description" max={512} type="text" />
        </label>
        <p>
          <button type="submit">Save</button>
          <button type="button">Cancel</button>
        </p>
      </Form>
    </div>
  );
};
