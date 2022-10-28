import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import useMutation from "../../libs/useMutation";

const SignIn = (props) => {
  const { register, handleSubmit } = useForm();
  const [enter, { loading, data, error }] = useMutation("/member/auth");
  const navigate = useNavigate();
  const onSubmit = async (giveData, e) => {
    e.preventDefault();
    if (loading) return;
    enter({ user_id: giveData.loginID, password: giveData.loginPwd });
  };

  const onError = (errors, e) => {
    console.log(errors);
  };
  useEffect(() => {
    if (data?.message === "OK") {
      navigate("/main");
    }
    if (error) {
      console.log(error);
    }
  }, [data, error]);

  return (
    <div className="flex flex-col space-y-10 items-center justify-center bg-gradient-to-r from-purple-300 to-blue-200 h-[100vh] via-pink-200">
      <span className=" font-dancing text-9xl text-pink-400">Harmony</span>
      <div className=" flex flex-col rounded-xl w-1/3 h-1/3 bg-gray-600 bg-opacity-10 items-center justify-center space-y-4 min-w-min">
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col items-center justify-center space-y-4 mx-2"
        >
          <div className=" space-y-6 flex flex-col items-center justify-center ">
            <div className="flex flex-col ">
              <input
                {...register("loginID")}
                id="loginid"
                type="text"
                placeholder="ID"
                className=" text-lg outline-none p-2 rounded-md bg-gray-100 bg-opacity-40 "
              />
            </div>
            <div className="flex flex-col">
              <input
                placeholder="PASSWORD"
                {...register("loginPwd")}
                id="loginpwd"
                type="password"
                className=" text-lg outline-none p-2 rounded-md  bg-gray-100 bg-opacity-40"
              />
            </div>
          </div>
          <button type="submit">로 그 인</button>
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
