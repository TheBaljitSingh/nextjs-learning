import axios from "axios";

//async component - next new feature
export default async function Home() {

  const userDetails = await getUserDetails();

  console.log(userDetails);



  return (
    <div>
  <div className="max-w-sm mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">User Details</h2>

    <div className="space-y-2 text-gray-700">
      <p><span className="font-medium">Name:</span> {userDetails?.name}</p>
      <p><span className="font-medium">Email:</span> {userDetails?.email}</p>
    </div>

    </div>
    <div>
    </div>
  </div>

  );
}


async function getUserDetails(){

  // await new Promise((r)=>setTimeout(r, 5000));

  const response = await axios.get('http://localhost:3000/api/user');

  return response.data;

    
}

