import * as React from "react";

interface VerificationUserTemplate {
  code: string;
}

export const VerificationUserTemplate: React.FC<
  Readonly<VerificationUserTemplate>
> = ({ code }) => (
  <div>
    <p>
      Verification code: <h2>{code}</h2>
    </p>
    <p>
      <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>
        Confirm registration
      </a>
    </p>
  </div>
);
