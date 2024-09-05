import { createContext, JSXElement, useContext } from "solid-js";

const DemoContext = createContext<string>("initial");

export const DemoProvider = (props: { children: JSXElement }) => {
  return (
    <DemoContext.Provider value={"new value"}>
      {props.children}
    </DemoContext.Provider>
  );
};

export const DemoChild = () => {
  const value = useContext(DemoContext);
  return (
    <div>
      <h3>Context</h3>
      <p>{value}</p>
    </div>
  );
};
