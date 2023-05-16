import React, { useEffect } from "react";
import { Form, useActionData } from "react-router-dom";
import { createComponent } from "../../utils/gameApi";
import { IComponent } from "../../utils/models";
import toast, { Toaster } from "react-hot-toast";

export async function action({ request, params }) {
  const formData = await request.formData();
  const componentData = Object.fromEntries(formData) as IComponent;
  const componentResponse = await createComponent(componentData);
  const component = await componentResponse?.json();
  if (componentResponse?.status === 201) {
    toast.success(componentResponse?.statusText);
    console.log(component);
  } else {
    const errorMessage =
      componentResponse?.statusText + ". " + component.error ?? undefined;
    toast.error(errorMessage ?? "There was an error.", {
      id: "componentError",
    });
    console.log(component);
  }
  return component ?? {};
}
export const AdminComponent = () => {
  useEffect(()=>{  toast.remove()
  },[])
  return (
    <div>
      <Toaster />
      <Form method="post">
        <label>
          <span>Component name:</span>
          <input name="name" required={true} max={128} type="text" />
        </label>
        <label>
          <span>Chip vendor</span>
          <input name="chipvendor" max={128} required={true} type="text" />
        </label>
        <label>
          <span>Product vendor</span>
          <input name="productvendor" max={128} type="text" />
        </label>
        <label>
          <span>Product description</span>
          <input name="description" max={255} type="text" />
        </label>
        <label>
          <span>Product category (CPU/GPU)</span>
          <input
            name="type"
            required={true}
            pattern={"^GPU$|^CPU$"}
            type="text"
          />
        </label>
        <p>
          <button type="submit">Save</button>
          <button type="button">Cancel</button>
        </p>
      </Form>
    </div>
  );
};
