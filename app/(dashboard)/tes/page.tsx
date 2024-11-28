"use client"
import axios from 'axios';
import React from 'react'

export default function Test() {
const handleLogin = async(e: any) => {
  e.preventDefault();
  const form = document.getElementById("login-form") as HTMLFormElement;
  const email = form.elements.namedItem("email") as HTMLInputElement;
  const password = form.elements.namedItem("password") as HTMLInputElement;
  
const response = await axios.post('/api/inventory', {
  email: "email.value",
  password: "password.value",
});

if (response.status === 200) {
  console.log("Login successful");
} else {
  console.error("Login failed");
} 

  // const response = await fetch("/api/inventory", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ email: email.value, password: password.value }),
  // });

  // if (response.ok) {
  //   const data = await response.json();
  //   console.log(data);
  // } else {
  //   console.error("Login failed");
  // }
}
  return (
    <div>
      <form action="" id="login-form">
        <label htmlFor="email">
          Email
          <input type="email" name="email" id="email" required />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" name="password" id="password" required />
        </label>
        <button id="btn" type="submit" onClick={(e) => handleLogin(e)}>Login</button>
      </form>
    </div>
  )
}
