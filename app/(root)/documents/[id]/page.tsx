import CollabrativeRoom from "@/components/CollabrativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: SearchParamProps) => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const { id } = await params;

  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  });
  if (!room) redirect("/");

  const userIds = Object.keys(room.usersAccesses);
  const users = await getClerkUsers({ userIds });

  // const usersData = users?.map((user: any) => ({
  //   ...user,
  //   userType: room.usersAccesses[user.email]?.includes("room:write")
  //     ? "editor"
  //     : "viewer",
  // }));
  const usersData = users?.map((user: unknown) => {
    const userObj = user as { email?: string }; // Narrow down the type
    return {
      ...userObj,
      // userType: room?.usersAccesses?.[userObj.email || ""]?.includes(
      //   "room:write"
      // )
      //   ? "editor"
      //   : "viewer",
      userType: (room?.usersAccesses as { [key: string]: string[] })?.[
        userObj.email || ""
      ]?.includes("room:write")
        ? "editor"
        : "viewer",
    };
  });

  // const currentUserType = room.usersAccesses[
  //   clerkUser.emailAddresses[0].emailAddress
  // ]?.includes("room:write")
  //   ? "editor"
  //   : "viewer";
  const currentUserType = (room.usersAccesses as { [email: string]: string[] })[
    clerkUser.emailAddresses[0].emailAddress
  ]?.includes("room:write")
    ? "editor"
    : "viewer";

  return (
    <main>
      <CollabrativeRoom
        roomId={id}
        roomMetadata={room?.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  );
};

export default page;
