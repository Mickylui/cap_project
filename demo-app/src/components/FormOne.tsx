import { useState } from "react";

function FormOne() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(username, password);
        }}
      >
        <div>
          <label htmlFor="form-username">Username</label>
          <input type="text" id="form-username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="form-password">Password</label>
          <input type="text" id="form-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default FormOne;
