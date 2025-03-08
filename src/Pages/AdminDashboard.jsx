// import { useEffect, useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import axios from "axios";

// export default function AdminDashboard() {
//     const [stats, setStats] = useState({ totalSubscribers: 0, stateStats: [] });
//     const [notification, setNotification] = useState({ state: "", message: "" });

//     useEffect(() => {
//         axios.get("http://localhost:5000/api/subscribers/stats")
//             .then((res) => {
//                 console.log("API Response:", res.data);
//                 setStats(res.data);
//             })
//             .catch(err => console.error("API Error:", err));
//     }, []);
    

//     const sendNotification = async () => {
//         if (!notification.state || !notification.message) return alert("Fill all fields");

//         try {
//             const res = await axios.post("http://localhost:5000/api/notifications/send-notification", {
//                 states: [notification.state],
//                 message: notification.message
//             });
//             alert("✅ Notification sent successfully!");
//             setNotification({ state: "", message: "" });
//         } 
        
//         catch (error) {
//             alert("❌ Failed to send notification. Try again.");
//             console.error("Error sending notification:", error);
//         }
//     };

//     return (
//         <div className="p-6 space-y-6">
//             <Card>
//                 <CardContent className="p-6">
//                     <h2 className="text-2xl font-bold">Total Subscribers: {stats.totalSubscribers}</h2>
//                 </CardContent>
//             </Card>

//             <Card>
//                 <CardContent className="p-6">
//                     <h2 className="text-xl font-semibold mb-4">State-wise Subscribers</h2>
//                     <ResponsiveContainer width="100%" height={300}>
//                         {stats.stateStats.length > 0 ? (
//                             <BarChart data={stats.stateStats}>
//                                 <XAxis dataKey="state" />
//                                 <YAxis />
//                                 <Tooltip />
//                                 <Bar dataKey="count" fill="#4F46E5" />
//                             </BarChart>
//                         ) : (
//                             <p className="text-center">No data available</p>
//                         )}
//                     </ResponsiveContainer>

//                 </CardContent>
//             </Card>

//             <Card>
//                 <CardContent className="p-6 space-y-4">
//                     <h2 className="text-xl font-semibold">Send Notification</h2>
//                     <select
//                         className="w-full p-2 border rounded"
//                         onChange={(e) => setNotification({ ...notification, state: e.target.value })}
//                     >
//                         <option value="">Select State</option>
//                         {stats.stateStats.map((s) => (
//                             <option key={s.state} value={s.state}>{s.state}</option>
//                         ))}
//                     </select>
//                     <textarea
//                         className="w-full p-2 border rounded"
//                         placeholder="Enter message"
//                         onChange={(e) => setNotification({ ...notification, message: e.target.value })}
//                     />
//                     <Button onClick={sendNotification} className="w-full">Send Notification</Button>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }


import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import axios from "axios";

export default function AdminDashboard() {
    const [stats, setStats] = useState({ totalSubscribers: 0, stateStats: [] });
    const [notification, setNotification] = useState({ state: "", message: "" });
    const [files, setFiles] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/subscribers/stats")
            .then((res) => setStats(res.data))
            .catch(err => console.error("API Error:", err));
    }, []);

    const sendNotification = async () => {
        if (!notification.state || !notification.message) return alert("Fill all fields");
        
        const formData = new FormData();
        formData.append("states", notification.state);
        formData.append("message", notification.message);
        files.forEach(file => formData.append("file", file));
        
        try {
            await axios.post("http://localhost:5000/api/notifications/send-notification", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert("✅ Notification sent successfully!");
            setNotification({ state: "", message: "" });
            setFiles([]);
        } catch (error) {
            alert("❌ Failed to send notification. Try again.");
            console.error("Error sending notification:", error);
        }
    };

    const handleFileChange = (event) => {
        setFiles([...files, ...event.target.files]);
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardContent className="p-6">
                    <h2 className="text-2xl font-bold">Total Subscribers: {stats.totalSubscribers}</h2>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">State-wise Subscribers</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        {stats.stateStats.length > 0 ? (
                            <BarChart data={stats.stateStats}>
                                <XAxis dataKey="state" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#4F46E5" />
                            </BarChart>
                        ) : (
                            <p className="text-center">No data available</p>
                        )}
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Send Notification</h2>
                    <select
                        className="w-full p-2 border rounded"
                        onChange={(e) => setNotification({ ...notification, state: e.target.value })}
                        value={notification.state}
                    >
                        <option value="">Select State</option>
                        {stats.stateStats.map((s) => (
                            <option key={s.state} value={s.state}>{s.state}</option>
                        ))}
                    </select>
                    
                    {/* File Preview */}
                    {files.length > 0 && (
                        <div className="space-y-2">
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                                    <span>{file.name}</span>
                                    <button onClick={() => removeFile(index)} className="text-red-500">
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    <textarea
                        className="w-full p-2 border rounded"
                        placeholder="Enter message"
                        value={notification.message}
                        onChange={(e) => setNotification({ ...notification, message: e.target.value })}
                    />
                    
                    <input type="file" multiple className="hidden" id="fileInput" onChange={handleFileChange} />
                    <label htmlFor="fileInput" className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded text-center w-full block">
                        + Add Files
                    </label>
                    
                    <Button onClick={sendNotification} className="w-full">Send Notification</Button>
                </CardContent>
            </Card>
        </div>
    );
}
