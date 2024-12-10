import axios from "axios";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.getElementById("getOtp")?.addEventListener("click", getOtp);
  }, []);

  async function getOtp() {
    alert(11)
    if ("OTPCredential" in window) {
      try {
        const otpInput = document.getElementById("otp");

        // Trigger the WebOTP API
        const otp = await navigator.credentials.get({
          otp: { transport: ["sms"] },
        });

        if (otp && otp.code) {
          otpInput.value = otp.code; // Automatically fill the input with the code
          console.log("Received OTP:", otp.code);
        }
      } catch (err) {
        console.error("Error fetching OTP:", err);
      }
    } else {
      console.log("WebOTP API is not supported on this browser.");
    }
  }
  const sendSms = () => {
    const message = "Your code is: 12345 @form.greendataware.com #12345";
    const mobile = "09036660463";

    const encodedMessage = encodeURIComponent(message); // Encode special characters
    const url = `https://api.greendataware.com/api/greenweb/SendGreenSms?Message=${encodedMessage}&Mobile=${mobile}`;

    axios
      .get(url)
      .then((response) => {
        console.log("SMS sent successfully:", response.data);
      })
      .catch((error) => {
        console.error(
          "Error sending SMS:",
          error.response?.data || error.message
        );
      });
  };

  return (
    <div>
      <input
        id="otp"
        type="text"
        inputMode="numeric"
        placeholder="Enter SMS code"
      />
      <button id="getOtp" onClick={() => sendSms()}>
        Get SMS Code
      </button>
    </div>
  );
};

export default Index;
