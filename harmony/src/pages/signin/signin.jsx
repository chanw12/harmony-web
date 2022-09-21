import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

const SignIn = (props) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data, e) => {
    e.preventDefault();
    console.log(data);
    // // let user = await login()
    // this.setState({ user })
  };

  const onError = (errors, e) => {
    console.log(errors);
  };

  return (
    <div className="flex flex-col space-y-10 items-center justify-center bg-gradient-to-r from-purple-300 to-blue-200 h-[100vh] via-pink-200">
      <span className=" font-dancing text-9xl text-pink-400">Harmony</span>
      <div className=" flex flex-col rounded-xl w-1/3 h-1/3 bg-gray-600 bg-opacity-10 items-center justify-center space-y-4 min-w-min">
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col items-center justify-center mx-2"
        >
          <div className=" space-y-6 flex flex-col items-center justify-center ">
            <div className="flex flex-col ">
              <label htmlFor="loginid" className=" text-lg">
                ID
              </label>
              <input
                {...register("loginID")}
                id="loginid"
                type="text"
                className=" text-lg outline-none p-2 rounded-md bg-gray-100 bg-opacity-40 "
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="loginpwd" className="text-lg">
                PASSWORD
              </label>
              <input
                {...register("loginPwd")}
                id="loginpwd"
                type="password"
                className=" text-lg outline-none p-2 rounded-md  bg-gray-100 bg-opacity-40"
              />
            </div>
          </div>
        </form>
        <div className="flex text-gray-700 space-x-2 opacity-50 text-sm flex-shrink-0">
          <NavLink to="../signup">회원가입</NavLink>
          <div className=" border-r-2 border-gray-700 opacity-50 mx-1"></div>
          <button>아이디찾기</button>
          <div className=" border-r-2 border-gray-700 opacity-50 mx-1"></div>
          <button>비밀번호찾기</button>
        </div>
      </div>
    </div> //
  );
};

export default SignIn;
