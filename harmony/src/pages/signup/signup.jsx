import React from "react";
import { useForm } from "react-hook-form";

const SignUp = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onChange",
  });
  const onValid = (data) => {
    console.log(data);
  };
  const onInvalid = (data) => {
    console.log("hhh");
  };
  return (
    <div className=" px-10 py-10 flex justify-center relative">
      <div className="w-[460px]">
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <div className="flex flex-col space-y-3 w-full">
            <label htmlFor="signUpID">아이디</label>
            <input
              id="signUpID"
              type="text"
              className=" outline-none border-2 p-3 text-2xl text-gray-600 w-full h-[51px]"
              {...register("signUpID", {
                required: "필수 항목 입니다",
                minLength: { value: 6, message: "6자 이상이여야합니다" },
                maxLength: { value: 16, message: "16자 이하여야합니다" },
              })}
            />
          </div>
          {errors.signUpID ? (
            <div className=" text-red-500 text-xs font-medium pt-2 pb-5">
              {errors.signUpID.message}
            </div>
          ) : (
            <div className="text-red-500 text-xs font-medium pt-2 pb-5"></div>
          )}

          <div className="flex flex-col space-y-3 w-full">
            <label htmlFor="signUpPassword">비밀번호</label>
            <input
              id="signUpPassword"
              className=" outline-none border-2 p-1 w-full h-[51px]"
              {...register("signUpPassword", {
                required: "필수항목 입니다.",
                minLength: { value: 8, message: "8자 이상이여야 합니다" },
                maxLength: { value: 16, message: "16자 이하여야 합니다" },
              })}
              type="password"
            />
          </div>
          {errors.signUpPassword ? (
            <div className=" text-red-500 text-xs font-medium pt-2 pb-5">
              {errors.signUpPassword.message}
            </div>
          ) : (
            <div className="text-red-500 text-xs font-medium pt-2 pb-5"></div>
          )}

          <div className="flex flex-col space-y-3 w-full">
            <label htmlFor="signUpPcheck">비밀번호 재확인</label>
            <input
              id="signUpPcheck"
              className=" outline-none border-2 p-1 w-full h-[51px]"
              {...register("signUpPcheck", {
                required: "필수항목 입니다.",
                minLength: { value: 8, message: "8자 이상이여야 합니다" },
                maxLength: { value: 16, message: "16자 이하여야 합니다" },
              })}
              type="password"
            />
          </div>
          {(errors.signUpPcheck ? (
            <div className=" text-red-500 text-xs font-medium pt-2 pb-5">
              {errors.signUpPcheck.message}
            </div>
          ) : (
            <div className="text-red-500 text-xs font-medium pt-2 pb-5"></div>
          )) ||
            (watch("signUpPassword") !== watch("signUpPcheck") ? (
              <div className=" text-red-500 text-xs font-medium pt-2 pb-5">
                비밀번호가 일치하지 않습니다.
              </div>
            ) : (
              <div className="text-red-500 text-xs font-medium pt-2 pb-5"></div>
            ))}

          <button className=" px-2 py-2 w-full text-white font tracking-widest rounded-md bg-pink-300">
            회 원 가 입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
