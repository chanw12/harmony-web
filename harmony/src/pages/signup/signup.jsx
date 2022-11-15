import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useMutation from "../../libs/useMutation";
import { sha256 } from "crypto-hash";
const SignUp = (props) => {
  const {
    register,
    clearErrors,
    formState: { errors },
    handleSubmit,
    setError,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const [signup, { loading, data, error }] = useMutation(
    `${process.env.REACT_APP_SERVER_ADDR}/member`
  );
  const navigate = useNavigate();
  const onValid = async (validData) => {
    const phone_number = "010" + validData.signUpPNumber;
    const giveData = {
      phone_number,
      user_id: validData.signUpID,
      password: await sha256(validData.signUpPassword).then((res) => {
        return res;
      }),
    };
    console.log(giveData);
    if (loading) return;
    signup(giveData);
  };
  const [isExist, setIsExist] = useState(3); // 서버에 등록된 아이디 조회결과 1:등록 x 2: 등록 o 3:조회 하지않은상태
  const [isExistP, setIsExistP] = useState(3);
  const onInvalid = (inValidData) => {
    console.log(inValidData);
  };
  const idCheck = async () => {
    if (watch("signUpID").length < 6) {
      return;
    }
    clearErrors("signUpID");
    const check_data = await fetch(
      `http://115.85.181.222:8080/member?user_id=${watch("signUpID")}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.data.length > 0) {
          //아이디가 서버에 존재하는 경우
          setIsExist(2);
          setError("signUpID", {
            type: "focus",
            message: "중복된 아이디 입니다.",
          });
        } else {
          //아이디가 서버에 존재하지 않는 경우
          setIsExist(1); //
          console.log(isExist);
          setError("signUpID", {
            type: "focus",
            message: "사용 가능한 아이디 입니다",
          });
        }
      });
  };
  const phoneCheck = async () => {
    if (watch("signUpPNumber").length < 8) {
      return;
    }
    clearErrors("signUpPNumber");
    const check_data = await fetch(
      `http://115.85.181.222:8080/member?phone_number=010${watch(
        "signUpPNumber"
      )}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.data.length > 0) {
          //아이디가 서버에 존재하는 경우
          setIsExistP(2);
          setError("signUpPNumber", {
            type: "focus",
            message: "중복된 전화번호 입니다.",
          });
        } else {
          //아이디가 서버에 존재하지 않는 경우
          setIsExistP(1); //
          console.log(isExistP);
          setError("signUpPNumber", {
            type: "focus",
            message: "사용 가능한 전화번호 입니다",
          });
        }
      });
  };
  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data?.message === "OK") {
      navigate("/");
    }
  }, [data, error, navigate]);
  useEffect(() => {
    setIsExist(3);
  }, [watch("signUpID")]);
  useEffect(() => {
    setIsExistP(3);
  }, [watch("signUpPNumber")]);
  return (
    <div className=" px-10 py-10 flex justify-center relative flex-col items-center space-y-4">
      <span className=" font-dancing text-9xl text-pink-400 cursor-default select-none">
        Harmony
      </span>
      <div className="w-[460px]">
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <div className="flex flex-col space-y-3 w-full">
            <label htmlFor="signUpID">아이디</label>
            <div className=" flex w-full space-x-4">
              <input
                id="signUpID"
                type="text"
                className=" w-3/4 outline-none border-2 p-3 text-2xl text-gray-600  h-[51px]"
                {...register("signUpID", {
                  required: "필수 항목 입니다",
                  validate: {
                    isExist: () =>
                      isExist === 2 ? "중복된 아이디 입니다" : null,
                    isnotCheck: () => (isExist === 3 ? "중복 확인 필요" : null),
                  },
                  minLength: { value: 6, message: "6자 이상이여야합니다" },
                  maxLength: { value: 16, message: "16자 이하여야합니다" },
                })}
              />

              <button
                onClick={idCheck}
                type="button"
                className=" px-2 py-2 w-1/5 text-white font tracking-widest rounded-md bg-pink-300 hover:bg-pink-400"
              >
                중복확인
              </button>
            </div>
          </div>
          {errors.signUpID ? (
            <div
              className={`${
                isExist === 1 ? "text-blue-500 " : " text-red-500"
              } text-xs font-medium pt-2 pb-5`}
            >
              {errors.signUpID.message}
            </div>
          ) : (
            <div className=" text-red-500 text-xs font-medium pt-2 pb-5"></div>
          )}

          <div className="flex flex-col space-y-3 w-full">
            <label htmlFor="signUpPassword">비밀번호</label>
            <input
              id="signUpPassword"
              className=" outline-none border-2 p-3 w-full h-[51px]"
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
              className=" outline-none border-2 p-3 w-full h-[51px]"
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
          )) &&
            (watch("signUpPassword") !== watch("signUpPcheck") ? (
              <div className=" text-red-500 text-xs font-medium pt-2 pb-5">
                비밀번호가 일치하지 않습니다.
              </div>
            ) : (
              <div className="text-red-500 text-xs font-medium pt-2 pb-5"></div>
            ))}
          <label htmlFor="phoneNumber">전화번호</label>
          <div
            id="phoneNumber"
            className="flex mb-2 space-x-4 items-center justify-center "
          >
            <span className=" w-1/5 text-2xl">
              010&nbsp;&nbsp;&nbsp;&nbsp;-
            </span>
            <input
              type="number"
              className=" rounded-md outline-none border-2 p-5  text-2xl w-3/5 text-gray-600 h-[30px] space-x-2"
              {...register("signUpPNumber", {
                required: true,
                minLength: {
                  value: 8,
                  message: "올바른 전화번호 형식이 아닙니다",
                },
                maxLength: {
                  value: 8,
                  message: "올바른 전화번호 형식이 아닙니다",
                },
                validate: {
                  isExist: () =>
                    isExist === 2 ? "중복된 전화번호 입니다" : null,
                  isnotCheck: () => (isExist === 3 ? "중복 확인 필요" : null),
                },
              })}
              id="tel_1"
            />
            <button
              type="button"
              onClick={phoneCheck}
              className=" w-1/5 px-2 py-2  text-white font tracking-widest rounded-md bg-pink-300 hover:bg-pink-400"
            >
              중복확인
            </button>
          </div>
          {errors.signUpPNumber ? (
            <div
              className={`${
                isExistP === 1 ? "text-blue-500 " : " text-red-500"
              } text-xs font-medium pt-2 pb-5`}
            >
              {errors.signUpPNumber.message}
            </div>
          ) : (
            <div className="text-red-500 text-xs font-medium pt-2 pb-5"></div>
          )}

          <button className=" hover:bg-pink-400 px-2 py-2 w-full text-white font tracking-widest rounded-md bg-pink-300">
            회 원 가 입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
