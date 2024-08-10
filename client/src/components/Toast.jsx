import React, { useEffect } from "react";

export default function Toast() {
  useEffect(() => {
    const toast = new bootstrap.Toast(document.getElementById("toast"));
    toast.show();
  }, []);

  return (
    <div id="toast" className="toast border border-success bg-success-subtle position-fixed bottom-0 end-0 me-2 mb-2" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-header bg-success-subtle">
        <strong className="me-auto text-success">Account Created Successfully!</strong>
      </div>
      <div className="toast-body text-success">
        You may now sign in with your account information.
      </div>
    </div>
  );
}

