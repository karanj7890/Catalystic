"use client";
import { use } from "react";
import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({params}) => {
  const { id } = use(params); // Extract `id` from route params
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  console.log("User ID:", id);

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (id) fetchPosts();
  }, [id]);

  return (
    <Profile
      name={`${userName.charAt(0).toUpperCase() + userName.slice(1)}`}
      desc={`Welcome to ${userName.charAt(0).toUpperCase() + userName.slice(1)}'s  profile page.`}
      data={userPosts}
    />
  );
};

export default UserProfile;