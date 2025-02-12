import { Route, Routes } from "react-router";
import { Home, SingleColor } from "./pages";
import { AppLayout, SingleColorLayout } from "./layouts";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path=":color" element={<SingleColorLayout />}>
        <Route index element={<SingleColor />} />
      </Route>
    </Routes>
  );
}

export default App;
