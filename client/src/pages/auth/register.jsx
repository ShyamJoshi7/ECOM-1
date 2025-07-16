import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerFormControls } from "@/config";
import CommonForm from "@/components/common/forms";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/authSlice";
import { toast } from "sonner";

const initialState = {
  username: "",
  email: "",
  password: "",
};
const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(registerUser(formData)).then((result) => {
      const payload = result?.payload;

      if (result?.type?.includes("fulfilled") && payload?.success) {
        toast.success(payload.message || "Registration successful");
        navigate("/auth/login");
      } else {
        toast.error(
          payload?.message || payload?.error || "Something went wrong"
        );
      }
    });
  }
  console.log(formData);
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl tracking-tight font-bold text-foreground">
          Create New Account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthRegister;
