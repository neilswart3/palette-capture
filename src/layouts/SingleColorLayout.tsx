import { Outlet } from "react-router";
import AppLayout from "./AppLayout";


const SingleColorLayout: React.FC = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default SingleColorLayout;
