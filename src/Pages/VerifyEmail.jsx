import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
    const { token } = useParams(); // Get token from URL
    const [message, setMessage] = useState("Verifying Email...");

    // useEffect(() => {
    //     const verifyEmail = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:5000/api/verify-email/${token}`);
    //             const data = await response.json();

    //             if (response.ok) {
    //                 setMessage(data.message);
    //             } 
    //             else {
    //                 setMessage(data.error || "Verification failed.");
    //             }
    //         } catch (error) {
    //             setMessage("Server error. Please try again later.");
    //         }
    //     };

    //     verifyEmail();
    // }, [token]);


    useEffect(() => {
        let isMounted = true;
    
        const verifyEmail = async () => {
            try {
                console.log("Verifying email...");  // Debugging
                const response = await fetch(`https://trial-q37f.onrender.com/api/verify-email/${token}`);
                const data = await response.json();
    
                if (isMounted) {
                    setMessage(response.ok ? data.message : data.error || "Verification failed.");
                }
            } catch (error) {
                if (isMounted) setMessage("Server error. Please try again later.");
            }
        };
    
        verifyEmail();
    
        return () => { isMounted = false; };  // Cleanup to prevent duplicate execution
    }, [token]);
     // <- Make sure this array has only token, not extra dependencies
    

    return (

        <div className="w-full h-full flex items-center justify-center">
            <p className="text-2xl font-bold text-center">
            {message}
            </p>
        </div>
    );
};

export default VerifyEmail;
