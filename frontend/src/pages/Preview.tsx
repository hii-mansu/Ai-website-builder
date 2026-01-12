import api from "@/config/axios";
import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import { Riple } from "react-loading-indicators";
import { data, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Preview = () => {
  const [loading, setLoading] = useState(false);
  const { projectId } = useParams();
  const [rawHtml, setRawHtml] = useState();
  const { data: session, isPending } = authClient.useSession();
  const { pathname } = useLocation();

  const CommunityPath =
  const fatchCode = async () => {
    try {
      setLoading(true);
        const { data } = await api.get(
          `/api/project/userProjectPrev/${projectId}`
        );
        console.log(data);
        setRawHtml(data.project.current_code);
    } catch (error) {
      toast.error("Error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fatchCode();
  }, [projectId, session?.user]);
  return (
    <>
      {loading ? (
        <iframe
          srcDoc={rawHtml}
          className="w-screen h-screen border-none mt-[-80px]"
          sandbox="allow-scripts allow-same-origin"
        />
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <Riple color="#2563EB" size="large" text="Loading" textColor="" />
        </div>
      )}
    </>
  );
};

export default Preview;
