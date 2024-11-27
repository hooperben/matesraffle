import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useAddTeammate } from "@/hooks/use-add-teammate";

const defaultUserInfo = {
  name: "",
  email: "",
  isAdmin: false,
};

const AddTeammate = ({
  raffleId,
  handleSuccessfulTeammateAdd,
}: {
  raffleId: string;
  handleSuccessfulTeammateAdd: () => Promise<void>;
}) => {
  const [userInfo, setUserInfo] = useState(defaultUserInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const { mutateAsync: addTeammateAsync, isPending: isAddingTeammate } =
    useAddTeammate(raffleId, userInfo);

  const isDisabled =
    userInfo.name.length < 3 ||
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(userInfo.email);

  const onSubmit = async () => {
    await addTeammateAsync();
    handleSuccessfulTeammateAdd();

    setUserInfo(defaultUserInfo);
  };

  return (
    <div className="flex flex-col gap-3 mt-4">
      <h1 className="text-xl font-bold text-[#800080] hover:text-[#9400D3] active:text-[#4B0082] from-35% to-[#000000]">
        Add Team Mate
      </h1>

      <p className="text-sm text-gray-700">
        Any team member you add here has full authority to sell as many tickets
        as they want to whoever they want.
      </p>
      <div className="flex flex-col gap-3">
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
        <div className="flex flex-col">
          <div className="flex flex-row w-half">
            <div className="flex items-center">
              <p>Set User as Admin:</p>
              <input
                type="checkbox"
                name="isAdmin"
                checked={userInfo.isAdmin}
                onChange={handleChange}
                className="ml-4 w-4 h-4"
              />
            </div>
          </div>

          <p className="text-sm text-gray-700 mt-4">
            If you add a teammate as an admin, they can add other people that
            can sell tickets too.
          </p>
        </div>

        <Button disabled={isDisabled || isAddingTeammate} onClick={onSubmit}>
          Add Team Member
        </Button>

        <Button disabled={isAddingTeammate} variant="destructive">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddTeammate;
