import React from "react";
import {
  AccountSettingsCards,
  ChangePasswordCard,
} from "@daveyplate/better-auth-ui";

const Settings = () => {
  return (
    <div className="w-full p-4 flex flex-col gap-6 justify-center items-center min-h-[90vh]">
      <AccountSettingsCards
        classNames={{
          card: {
            base: "bg-transparent ring ring-blue-600 max-w-xl mx-auto",
            footer: "bg-transparent ring ring-blue-600",
          },
        }}
      />
      <div className="w-full">
        <ChangePasswordCard
          classNames={{
            base: "bg-transparent ring ring-blue-600 max-w-xl mx-auto",
            footer: "bg-transparent ring ring-blue-600",
          }}
        />
      </div>
    </div>
  );
};

export default Settings;
