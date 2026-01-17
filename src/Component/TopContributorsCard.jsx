import React from "react";
import { useTopContributors } from "../Context/TopContributorsContext";
import { useNavigate } from "react-router";

const rankStyles = [
  {
    bg: "bg-yellow-400!",
    text: "text-white!",
    shadow: "shadow-yellow-300!",
    extra: "animate-pulse! ring-2! ring-yellow-300!",
  },
  {
    bg: "bg-gray-300!",
    text: "text-white!",
    shadow: "shadow-gray-300!",
    extra: "",
  },
  {
    bg: "bg-orange-300!",
    text: "text-white!",
    shadow: "shadow-orange-300!",
    extra: "",
  },
];

const TopContributorsCard = () => {
  const { contributors, loading } = useTopContributors();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="bg-white! rounded-sm! shadow! p-4!">
        <p className="text-gray-500! text-sm!">Loading contributors…</p>
      </div>
    );
  }


  return (
    <div className=" w-full">
      <div className="resizing bg-white! rounded-sm!  w-full ">
        {/* Header */}
        <div className="px-3! py-3! border-b! border-blue-200 bg-blue-50! rounded-t-sm!">
          <h3 className="font-semibold! text-blue-900! text-sm sm:text-base">
            Top Contributors - This Week
          </h3>

          <div className="flex! justify-between! items-center! mt-2!">
            <select className="border! border-gray-200 rounded-sm! px-2! py-1! text-xs sm:text-sm!">
              <option>MPC Autonomous</option>
            </select>

            <span className="text-xs! text-blue-600!">
              Last 7 Days
            </span>
          </div>
        </div>

        {/* List */}
        <div className="divide-y!">
          {contributors.map((user, index) => {
            const avatarImage = user.avatar_url
              ? `https://models.readyplayer.me/${user.avatar_url
                .split("/")
                .pop()
                .replace(".glb", ".png")}`
              : `https://api.dicebear.com/7.x/lorelei/svg?seed=${user.upload_user_id}`;

            return (
              <div
                key={user.upload_user_id}
                className="flex! items-center! justify-between!
                         px-3! py-2! sm:px-4! sm:py-3!"
              >
                <div className="flex! items-center! gap-2! sm:gap-3!">
                  {/* Rank */}
                  <div
                    className={`w-8! h-8! sm:w-10! sm:h-10!
                    flex! items-center! justify-center!
                    rounded-full! font-semibold!
                    text-xs sm:text-sm!
                    ${rankStyles[index]?.bg || "bg-gray-200!"}
                    ${rankStyles[index]?.text || "text-gray-700!"}
                    ${rankStyles[index]?.extra || ""}
                  `}
                  >
                    {index + 1}
                  </div>

                  {/* Avatar */}

                  <div className="relative cursor-pointer!  w-13! h-13!   sm:w-15! sm:h-15! ml-2! rounded-full bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.75! shadow-lg">

                    {/* Inner glass circle */}
                    <div className="w-full h-full rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                      <img
                        src={avatarImage}
                        className="w-full h-full object-cover rounded-full transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                
                  </div>

                  {/* Name + Roll */}
                  <div className="flex! flex-col!">
                    <span className="font-medium! text-gray-800!
                                   text-sm sm:text-base!">
                      {user.full_name}
                    </span>

                    {user.masked_rollno && (
                      <div className="relative! group! w-fit!">
                        <span className="text-xs! text-gray-500! cursor-help!">
                          {user.masked_rollno}
                        </span>

                        {/* Tooltip */}
                        <div
                          className="absolute! bottom-full! left-1/2!
                                   -translate-x-1/2!
                                   mb-1! hidden! group-hover:block!
                                   bg-black! text-white!
                                   text-[10px]!
                                   px-2! py-1!
                                   rounded-sm! whitespace-nowrap!"
                        >
                          Student Roll No.
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload count (hidden on mobile) */}
                <span className=" sm:block text-sm! text-gray-600!">
                  {user.total_uploads} Approved Uploads
                </span>
              </div>
            );
          })}
        </div>
        <div className="md:hidden">

          <p className="text-center text-sm mt-2! text-yellow-600!">Let Participate</p>
          <button onClick={() => navigate("/global-upload-question-paper")} className="bg-blue-500 w-full text-center font-semibold! rounded-4xl mt-2! py-2! text-sm text-white!">Upload</button>
        </div>
      </div>
    </div>
  );
};

export default TopContributorsCard;
