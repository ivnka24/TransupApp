// import LoginPage from "./pages/LoginPage";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import ContextProvider from "./store/ContextStore";
import  { TableProvider } from "./store/ContextTable";
function App() {
  return (
    <>
      <ContextProvider>
        <TableProvider>
          <RouterProvider router={router} />
        </TableProvider>
      </ContextProvider>
    </>
  );
}

export default App;
