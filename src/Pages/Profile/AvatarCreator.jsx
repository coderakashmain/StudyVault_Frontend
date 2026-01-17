import { useEffect, useRef } from "react";
import useApi from "../../hooks/useApi";

const AVATAR_URL =
    "https://readyplayer.me/avatar?frameApi&bodyType=fullbody";

export default function AvatarCreator({ onClose,setAvatarPath }) {
    const { post, loading } = useApi();
    const iframeRef = useRef(null);

useEffect(() => {
  const handleMessage = (event) => {
    if (event.origin !== "https://readyplayer.me") return;

    let data;
    try {
      data = typeof event.data === "string"
        ? JSON.parse(event.data)
        : event.data;
    } catch {
      return;
    }

    if (data?.source !== "readyplayerme") return;

 

  
    if (data.eventName === "v1.frame.ready") {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({
          target: "readyplayerme",
          type: "subscribe",
          eventName: "v1.avatar.exported",
        }),
        "https://readyplayer.me"
      );
    }


    if (data.eventName === "v1.avatar.exported") {
      const avatarUrl = data.data.url;
      saveAvatar(avatarUrl);
    }
  };

  window.addEventListener("message", handleMessage);
  return () => window.removeEventListener("message", handleMessage);
}, []);




    const saveAvatar = async (avatarUrl) => {
        try {
          const res =  await post(
                "/user/avatar",
                true, // use logged-in user token
                { avatarUrl }
            );

            setAvatarPath(res.data.avatar_url)
            onClose(); 
           
        } catch (err) {
            console.error("Avatar save failed", err);
        }
    };

    return (
        <div className="fixed inset-0 w-full h-screen flex flex-col bg-white z-999999">
            {/* Header */}
            <div className="flex items-center justify-between px-4! py-2! border-b">
                <h2 className="text-sm! p-0! font-semibold!">
                    Create your avatar
                </h2>

                <button
                    onClick={onClose}
                    disabled={loading}
                    className="text-xs px-3! py-1! rounded-sm border border-gray-200 cursor-pointer hover:bg-gray-100 transition disabled:opacity-50"
                >
                    Close
                </button>
            </div>

            {/* Avatar Creator */}
          <iframe
  ref={iframeRef}
  src="https://readyplayer.me/avatar?frameApi&bodyType=fullbody"
  allow="camera *; microphone *"
  className="w-full h-full border-0"
/>

        </div>
    );
}
