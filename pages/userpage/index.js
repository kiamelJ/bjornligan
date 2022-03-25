import UserPageComponent from "../../components/Userpage";
import LayoutComponent from "../../components/Layout";
import Meta from "../../components/Meta";

const UserPage = () => {
  return (
    <>
      <LayoutComponent>
        <Meta title='Profile' />
        <UserPageComponent />
      </LayoutComponent>
    </>
  );
};

export default UserPage;
