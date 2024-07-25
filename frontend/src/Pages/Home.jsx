import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="m-20">
      <div className="flex flex-col sm:flex-row sm:overflow-y-auto justify-center gap-8 mt-16 sm:mt-32">
        <div className="w-72 h-48 bg-[#F6F2DD] border-b-8 border-blue-500 rounded text-center shadow-lg">
          <div className="flex items-center justify-center h-full">
            <Link
              to="/projectTable"
              className="bg-blue-500 py-2 px-5 rounded-md text-white font-semibold hover:bg-blue-700"
            >
              View Projects
            </Link>
          </div>
        </div>
        <div className="w-72 h-48 bg-[#F6F2DD] border-b-8 border-blue-500 rounded text-center shadow-lg">
          <div className="flex items-center justify-center h-full">
            <Link
              to="/noticesTable"
              className="bg-blue-500 py-2 px-5 rounded-md text-white font-semibold hover:bg-blue-700"
            >
              Notices
            </Link>
          </div>
        </div>
        <div className="w-72 h-48 bg-[#F6F2DD] border-b-8 border-blue-500 rounded text-center shadow-lg">
          <div className="flex items-center justify-center h-full">
            <Link
              to="/preferenceList"
              className="bg-blue-500 py-2 px-5 rounded-md text-white font-semibold hover:bg-blue-700"
            >
              Preference List Registration
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
