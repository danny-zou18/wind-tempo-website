"use client";

import React, { useState } from "react";
import Modal from "../Modal";

type SignupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSignedUp?: () => void;          // 👈 NEW
};

const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onClose,
  onSwitchToLogin,
  onSignedUp,                       // 👈 NEW
}) => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          username: username.trim(),
          password,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.message || "Could not create account.");
        return;
      }

      // ✅ tell TopNav to refresh session (or prep for login)
      if (onSignedUp) {
        await onSignedUp();
      }

      // reset + close + optionally switch to login
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      onClose();
      onSwitchToLogin();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create an account">
      {/* form JSX unchanged */}
      {/* ...your existing JSX, with handleSubmit on the form and the same inputs/buttons... */}
    </Modal>
  );
};

export default SignupModal;
