"use client";
import { useState } from "react";

interface UserForm {
  username: String;
  email: String;
  password: String;
}

const handleSubmit = async (formdata: UserForm) => {
  console.log("formdata: ", formdata);
  fetch("http://localhost:8000/auth/register", {
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
      console.log("response: ", response); // Log the response from the server
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
          <pre></pre>
        </>
      ) : (
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleFormSubmit}
        >
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            username
          </label>
          <input
            id="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            email
          </label>
          <input
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            password
          </label>
          <input
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
          />
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirm"
          >
            confirm
          </label>
          <input
            id="confirm"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            type="text"
          />
          {error && <p className="error">{error}</p>}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
