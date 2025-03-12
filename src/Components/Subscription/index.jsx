// import { useState } from "react";
// import Select from "react-select";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// const states = [
//   { value: "rajasthan", label: "Rajasthan" },
//   { value: "maharashtra", label: "Maharashtra" },
//   { value: "karnataka", label: "Karnataka" },
//   { value: "tamilnadu", label: "Tamil Nadu" },
//   { value: "delhi", label: "Delhi" },
// ];

// const SubscriptionForm = () => {
//   const [contact, setContact] = useState("");
//   const [selectedStates, setSelectedStates] = useState([]);

//   const isValidContact = (value) => {
//     const phoneRegex = /^[0-9]{10,15}$/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return phoneRegex.test(value) || emailRegex.test(value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!isValidContact(contact)) {
//       alert("Please enter a valid phone number or email.");
//       return;
//     }

//     const subscriberData = { contact, states: selectedStates.map(s => s.value) };
//     console.log("Subscriber Data:", subscriberData);

//     // TODO: Send data to backend API
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
//       <h2 className="text-xl font-bold mb-4">Subscribe for Notifications</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <Input 
//           type="text" 
//           placeholder="Enter your phone number or email" 
//           value={contact} 
//           onChange={(e) => setContact(e.target.value)} 
//         />
//         <Select
//           options={states}
//           isMulti
//           value={selectedStates}
//           onChange={setSelectedStates}
//           placeholder="Select states"
//           className="text-black"
//         />
//         <Button type="submit" className="w-full">Subscribe</Button>
//       </form>
//     </div>
//   );
// };

// export default SubscriptionForm;




// New one

import { useState } from "react";
import Select from "react-select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const states = [
  { value: "rajasthan", label: "Rajasthan" },
  { value: "gujrat", label: "Gujrat" },
  { value: "himachal", label: "Himachal" },
  { value: " Puducherry", label: " Puducherry" },
  { value: "chandigarh", label: "Chandigarh" },
  { value: "punjab", label: "Punjab" },
];

const SubscriptionForm = () => {
  const [contact, setContact] = useState("");
  const [selectedStates, setSelectedStates] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidContact = (value) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return phoneRegex.test(value) || emailRegex.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidContact(contact)) {
      alert("Please enter a valid phone number or email.");
      return;
    }

    if (selectedStates.length === 0) {
      alert("Please select at least one state.");
      return;
    }

    const subscriberData = {
      emailOrPhone: contact,
      states: selectedStates.map((s) => s.value),
      name,
    };

    setLoading(true);
    try {
      const response = await axios.post(
        "https://trial-q37f.onrender.com/api/subscribe",
        subscriberData
      );
      alert(response.data.message);
      setContact("");
      setSelectedStates([]);
      setName("");
    } catch (error) {
      console.error("Subscription failed:", error);
      alert(error.response?.data?.error || "Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Subscribe for Notifications</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter your phone number or email"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Select
          options={states}
          isMulti
          value={selectedStates}
          onChange={setSelectedStates}
          placeholder="Select states"
          className="text-black"
        />
        <Button type="submit" className="w-full cursor-pointer" disabled={loading || !contact.trim()}>
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
};

export default SubscriptionForm;
