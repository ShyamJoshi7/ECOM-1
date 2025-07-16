import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginFormControls } from "@/config";
import { useDispatch } from "react-redux";
import CommonForm from "@/components/common/forms";
import { toast } from "sonner";
import { loginUser } from "@/store/authSlice";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(formData)).then((result) => {
      const payload = result?.payload;

      if (result?.type?.includes("fulfilled") && payload?.success) {
        toast.success(payload.message || "Login successful");
      } else {
        toast.error(
          payload?.message || payload?.error || "Something went wrong"
        );
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-3 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
