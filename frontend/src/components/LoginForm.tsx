"use client";
import { useState } from "react";

interface UserForm {
  username: String;
  email: String;
  password: String;
}

const handleSubmit = async (formdata: UserForm) => {
  console.log('formdata: ', formdata);
  fetch("http://localhost:8000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formdata),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to post user");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("There is a problem submiting login", error);
    });
    
  return formdata;
};

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null); // Updated the type

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await handleSubmit({
        username,
        email,
        password,
      });

      // Handle successful submission
      console.log('response: ', response); // Log the response from the server
      setFormSubmitted(true);
      setError(null);
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirm("");
    } catch (error) {
      // Handle errors from the fetch or the server
      setError("There was a problem submitting the form.");
      console.error("There is a problem submitting the form", error);
    }
  };

  return (
    <div>
      {formSubmitted ? (
        <>
        <p>Form submitted successfully!</p>
        <pre>

        </pre>
          </>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username">username</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
          <label htmlFor="email">email</label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
          <label htmlFor="password">password</label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
          />
          <label htmlFor="confirm">confirm</label>
          <input
            id="confirm"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            type="text"
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
