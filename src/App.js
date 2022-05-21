import { createContext, useState } from "react";
import Index from "./pages/Index";

export const DataContex = createContext([])

function App() {
  const [data, setData] = useState([])
  const value = {data, setData}
  
  return (
      <DataContex.Provider value={value}>
        <Index />
      </DataContex.Provider>
  );
}

export default App;
