import { useEffect, useState } from "react";
import api from "./utils/api";
import { PencilLineIcon } from "lucide-react";

const DeveloperProfile = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [edit, setIsEdit] = useState(false);
  const handleUpdatedata = (e) => {
    e.preventDefault();
    if (e.target.value.includes(",")) {
      e.target.value = e.target.value.split(",");
    }
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await api.get("/devProfile");
        if (response.data) {
          setData(response.data.dev);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    getProfileData();
  }, [edit]);

  if (loading) {
    return <h2>loading....</h2>;
  }
  const handleEdit = (e) => {
    e.preventDefault();
    setIsEdit(!edit);
  };
  return (
    <div className="border-5 h-full gap-2 rounded grid grid-cols-3 p-2">
      <div className="col-span-3 text-4xl flex justify-between items-center">
        <p className="">Hiii {data.name}</p>
        <button
          className="text-lg flex flex-row gap-2 hover:bg-sky-700 active:bg-sky-700 active:rounded-3xl hover:rounded-4xl p-2 items-center"
          type="button"
          onClick={handleEdit}
        >
          <PencilLineIcon size={20} />
          {edit ? "CANCEL" : "EDIT"}
        </button>
      </div>

      {/* username ..............................................................*/}

      {edit ? (
        <div className="text-base rounded-sm p-3 bg-[#6366F1]">
          username:
          <br />
          <input
            type="text"
            name="username"
            value={data.username||""}
            onChange={handleUpdatedata}
          />
        </div>
      ) : (
        <div className="text-base rounded-sm p-3 bg-[#6366F1]">
          username:
          <br />
          {data.username || "username not found"}
        </div>
      )}

      {/* bio ...................................................................*/}
      {edit ? (
        <div className="text-base rounded-sm p-3 bg-[#6366F1]">
          bio:
          <br />
          <input
            type="text"
            name="bio"
            value={data.bio||""}
            onChange={handleUpdatedata}
          />
        </div>
      ) : (
        <div className="text-base rounded-sm p-3 bg-[#6366F1]">
          bio:
          <br />
          {data.bio || <p className="">bio not found</p>}
        </div>
      )}

      {/* githuburl ...............................................................*/}
      {edit ? (
        <div className="text-base rounded-sm p-3 bg-[#6366F1]">
          github URL:
          <br />
          <input
            type="text"
            name="githuburl"
            value={data.githuburl||""}
            onChange={handleUpdatedata}
          />
        </div>
      ) : (
      <div className="text-base rounded-sm p-3 bg-[#6366F1]">
        github URL:
        <br />
        {data.githuburl || "githuburl not found"}
      </div>)}
      {/* portfoliourl ...................................................................... */}
      {edit ? (
        <div className="text-base rounded-sm p-3 bg-[#6366F1]">
          portfolioUrl:
          <br />
          <input
            type="text"
            name="portfolioUrl"
            value={data.portfolioUrl||""}
            onChange={handleUpdatedata}
          />
        </div>
      ) : (
      <div className="text-base rounded-sm p-3 bg-[#6366F1]">
        portfolioUrl:
        <br />
        {data.portfolioUrl || "portfolioUrl not found"}
      </div>)}

      {/* avatarurl ......................................................................*/}
      {edit ? (
        <div className="text-base rounded-sm p-3 bg-[#6366F1]">
          avatarUrl:
          <br />
          <input
            type="text"
            name="avatarUrl"
            value={data.avatarUrl||""}
            onChange={handleUpdatedata}
          />
        </div>
      ) : (
      <div className="text-base rounded-sm p-3 bg-[#6366F1]">
        avatarUrl:
        <br />
        {data.avatarUrl || "avatarUrl not found"}
      </div>)}

      {/* skills ...................................................................................*/}
      {edit ? (
        <div className="text-base rounded-sm p-3 bg-[#6366F1]">
          skills:
          <br />
          <input
            type="text"
            name="skills"
            value={Array.isArray(data.skills)?data.skills?.join(","):data.skills}
            onChange={handleUpdatedata}
          />
        </div>
      ) : (
      <div className="text-base rounded-sm grid grid grid-cols-3 grid-rows-9 place-items-center gap-1 p-3 bg-[#6366F1]">
        <p className="col-span-3 justify-self-start">skills:</p>
        {data.skills?.length > 0
          ? data.skills.map((skill, index) => (
              <div key={index} className="rounded bg-[#63A6FF] grid-row-span-3">
                {skill}
              </div>
            ))
          : "data not found"}
      </div>)}
    </div>
  );
};
export default DeveloperProfile;
