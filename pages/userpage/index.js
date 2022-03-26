import UserPageComponent from "../../components/Userpage";
import LayoutComponent from "../../components/Layout";
import Meta from "../../components/Meta";

const UserPage = () => {
  return (
    <>
      <LayoutComponent>
        <Meta title='Profile' keywords='user, about, information' description='Information about a user' />
        <UserPageComponent />
      </LayoutComponent>
    </>
  );
};

export default UserPage;
