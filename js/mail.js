document.addEventListener("DOMContentLoaded", () => {
    function showAlert(message) {
      const customAlert = document.getElementById("customAlert");
      const customAlertMessage = document.getElementById("customAlertMessage");
  
      if (customAlert && customAlertMessage) {
        customAlertMessage.innerHTML = message;
        customAlert.style.display = "block";
      } else {
        console.error("Custom alert element not found.");
      }
    }
  
    function closeAlert() {
      const customAlert = document.getElementById("customAlert");
      if (customAlert) {
        customAlert.style.display = "none";
      }
    }
  
    function toggleSubmitButton(form, disable) {
      const submitButton = form.querySelector("button[type='submit']");
      if (submitButton) {
        submitButton.disabled = disable;
      }
    }
  
    const form = document.getElementById("emailForm");
    const Apform = document.getElementById("AppointmentForm");
  
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        showAlert("Sending your email... Please wait.");
        toggleSubmitButton(form, true);
  
        const emailData = {
          to: "directorjtenergypvtltd@gmail.com",//yha email daalo jis par recive hona hai
          subject: document.getElementById("subject").value,
          text: `<h4>New Contact Request</h4>
                      <p><strong>Name:</strong> ${
                        document.getElementById("name").value
                      }</p>
                      <p><strong>Email:</strong> ${
                        document.getElementById("email").value
                      }</p>
                      <p><strong>Subject:</strong> ${
                        document.getElementById("subject").value
                      }</p>
                      <p><strong>Message:</strong> ${
                        document.getElementById("messages").value
                      }</p>`,
        };
  
        try {
          const response = await fetch("http://localhost:3000/send-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(emailData),
          });
  
          if (response.ok) {
            showAlert("Your email has been sent successfully!");//ye message hai apne hisab se set kar lena
          } else {
            const errorText = await response.text();//ok 
            showAlert(
              "Failed to send email. Server responded with: " + errorText
            );
          }
        } catch (error) {
          showAlert(
            "An error occurred while sending the email: " + error.message
          );
        } finally {
          toggleSubmitButton(form, false);
        }
      });
    }
  });
  