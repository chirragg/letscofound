import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaRegFilePdf } from "react-icons/fa";

export default function DetailedProject() {
  const { projectId } = useParams();
  const [projectDetail, setProjectDetail] = useState(null);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://lcf-backend.onrender.com/api/projects/projectsingle/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjectDetail(response.data);

        // Check if user is already a member of the group
        const membershipResponse = await axios.get(
          `https://lcf-backend.onrender.com/api/groups/checkMembership/${response.data.concept}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsMember(membershipResponse.data.isMember);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const handleJoinGroup = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://lcf-backend.onrender.com/api/groups/join/${projectDetail.concept}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsMember(true);
      // Navigate to the group details (this can be adjusted based on your UI flow)
    } catch (error) {
      console.error("Error joining group:", error);
    }
  };

  if (!projectDetail) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all hover:shadow-3xl hover:scale-105">
        <div className="flex items-center space-x-8 bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-8">
          <img
            src={projectDetail.profileimageUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-extrabold">
              {projectDetail.username}
            </h2>
            <p className="text-lg opacity-90">{projectDetail.designation}</p>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <img
              src={`https://lcf-backend.onrender.com/uploads/${projectDetail.postImage}`}
              alt="Project"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-indigo-600">Concept</h3>
              <p className="text-gray-700 mt-2 text-justify leading-relaxed">
                {projectDetail.concept}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-red-600">
                Problem Statement
              </h3>
              <p className="text-gray-700 mt-2 text-justify leading-relaxed">
                {projectDetail.problem}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-green-600">Solution</h3>
              <p className="text-gray-700 mt-2 text-justify leading-relaxed">
                {projectDetail.solution}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-yellow-600">
                Funding Status
              </h3>
              <p className="text-gray-700 mt-2 text-justify leading-relaxed">
                {projectDetail.fundingStatus}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-purple-600">
                Startup Stage
              </h3>
              <p className="text-gray-700 mt-2 text-justify leading-relaxed">
                {projectDetail.startupStage}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-pink-600">Patent</h3>
              <p className="text-gray-700 mt-2 text-justify leading-relaxed">
                {projectDetail.patent}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-indigo-600">Industries</h3>
              <div className="flex flex-wrap mt-2 space-x-2">
                {projectDetail.industries.map((industry, index) => (
                  <span
                    key={index}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-sm hover:bg-indigo-700 transition-colors"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-teal-600">
                Roles Required
              </h3>
              {projectDetail.roles.length > 0 ? (
                projectDetail.roles.map((role, index) => (
                  <div
                    key={index}
                    className="ml-5 mb-4 bg-gray-100 p-4 rounded-lg border-l-4 border-teal-500 shadow-sm"
                  >
                    <p className="text-gray-900">
                      <span className="font-semibold">Role: </span>
                      {role.name}
                    </p>
                    <p className="text-gray-900">
                      <span className="font-semibold">Skills: </span>
                      {role.skills.join(", ")}
                    </p>
                    <p className="text-gray-900">
                      <span className="font-semibold">Commitments: </span>
                      {role.commitments}
                    </p>
                  </div>
                ))
              ) : (
                <p className="ml-5 text-gray-600">No roles listed.</p>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <FaRegFilePdf className="text-2xl text-purple-600" />
              <a
                href={`https://lcf-backend.onrender.com/uploads/${projectDetail.pitchDeck}`}
                className="text-purple-600 font-semibold underline hover:text-purple-800 transition-colors"
              >
                View Pitch Deck
              </a>
            </div>

            <div className="mt-8">
              <button
                onClick={handleJoinGroup}
                disabled={isMember}
                className={`px-6 py-3 font-bold rounded-lg shadow-md transition-transform ${
                  isMember
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 transform hover:scale-105"
                }`}
              >
                {isMember ? "Group Joined" : "Join Group"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
