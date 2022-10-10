import { useState } from "react";

interface FormState {
  username: string;
  password: string;
}

function FormTwo() {
  const [formState, setFormState] = useState<FormState>({
    username: "",
    password: "",
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formState);
        }}
      >
        <h3>this second form</h3>
        <div>
          <label htmlFor="form-username">Username</label>
          <input
            type="text"
            id="form-username"
            value={formState.username}
            onChange={(e) => setFormState({ ...formState, username: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="form-password">Password</label>
          <input
            type="text"
            id="form-password"
            value={formState.password}
            onChange={(e) => setFormState({ ...formState, password: e.target.value })}
          />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default FormTwo;
