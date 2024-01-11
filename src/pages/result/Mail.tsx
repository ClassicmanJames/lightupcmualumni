import React, { useEffect, useState } from "react";
import router from "next/router";
import Image from "next/image";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import * as Setting from "@/redux/reducers/setting";

import {
  useForm,
  Resolver,
  SubmitHandler,
  useController,
  Controller,
} from "react-hook-form";
type FormValues = {
  token: string;
  email: string;
};
const Mail = () => {
  const [disableBtn, setDisableBtn] = useState<boolean>(false);
  const [disableBtnsub, setDisableBtnsub] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const dispath = useDispatch();
  const token = searchParams.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm<FormValues>();
  const setDataUserTracking = async (data: FormValues) => {
    setDisableBtnsub(true);
    dispath(Setting.updateState({ isLoadingScreen: true }));
    let datasent = {
      token: token,
      email: data.email,
    };
    console.log(datasent);
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CMU_SERVICE + `/updateEmail`,
      datasent,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(response);
    if (response.data.status === 1) {
      //console.log(response.data.msg);
      router.push("/result/Done");
    } else if (response.data.status === 41) {
      dispath(Setting.updateState({ isLoadingScreen: true }));
      router.push("/result/Serverfull");
    } else if (response.data.status === 43) {
      //console.log(response.data.msg);
      router.push("/result/Success");
    }
  };
  return (
    <>
      <div className="grid m-5 h-50 bg-[#FBFBFB] drop-shadow-xl rounded-xl  ms:cols-12">
        <div className="grid">
          <div
            className="grid m-5  rounded-lg justify-items-center text-gray-400 text-center"
            style={{ padding: "16px" }}
          >
            <Image
              src={"/SUBLOGO1.png"}
              width={"200"}
              height={"30"}
              alt={"ssd"}
            ></Image>
          </div>
          <div className="flex m-5  justify-center">
            <img src={"/bg.jpg"} width={"550"} alt={"ssd"} />
          </div>

          <form
            id="applicationForm"
            onSubmit={handleSubmit(setDataUserTracking)}
          >
            <div className="flex m-5 justify-center flex-col">
              <div className="mb-3">
                <span className="text-slate-900 text-ms font-semibold">
                  อีเมล (E-mail)
                </span>
                <input
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                  type={"text"}
                  className={`border-2 text-gray-900 text-md rounded-lg  block w-full p-2.5 ${
                    errors.email ? "border-rose-500" : "border-gary-500"
                  }
              `}
                />
              </div>

              <div className=" ">
                <button
                  disabled={disableBtn}
                  // onClick={() => {
                  //   setPopup(true);
                  // }}
                  className={`bg-ccmu text-white p-3 w-full rounded-xl   ${
                    disableBtn ? "bg-gray-300 " : "bg-ccmu   "
                  }`}
                >
                  ลงทะเบียน
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Mail;
