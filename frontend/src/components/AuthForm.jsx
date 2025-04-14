import { useState } from "react";

export default function AuthForm({ type, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">{type === "login" ? "Login" : "Register"}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ email, password });
              }}
            >
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary w-100" type="submit">
                {type === "login" ? "Login" : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
