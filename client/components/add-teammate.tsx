import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

const AddTeammate = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    isAdmin: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div>
      <h1>Add Team Mate</h1>
      <form>
        <div>
          <label>Name:</label>
          <Input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <Input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Is Admin:</label>
          <Input
            type="checkbox"
            name="isAdmin"
            checked={userInfo.isAdmin}
            onChange={handleChange}
          />
        </div>

        <Button>Add Team Member</Button>
      </form>
    </div>
  );
};

export default AddTeammate;
