import Image from "next/image";
import axios from "axios";
import React, { useState, useEffect } from "react";
import * as Setting from "@/redux/reducers/setting";
import { useSelector, useDispatch } from "react-redux";
import { useQRCode } from "next-qrcode";
import { useParams, useSearchParams } from "next/navigation";

const Done = () => {
  const { SVG } = useQRCode();
  const dispath = useDispatch();
  dispath(Setting.updateState({ isLoadingScreen: false }));
  const [yearuser, setYearuser] = useState<string>();
  const searchParams = useSearchParams();
  dispath(Setting.updateState({ isLoadingScreen: false }));
  const [tkData, setTkData] = useState<string>();
  const token = searchParams.get("token");
  useEffect(() => {
    if (token) {
      setTkData(token);
    }
  }, [token]);
  return (
    <div className="m-5 h-50 bg-[#FBFBFB] drop-shadow-xl rounded-xl p-2">
      <div className="grid m-5  rounded-lg justify-items-center">
        <Image
          src={"/SUBLOGO1.png"}
          width={"200"}
          height={"30"}
          alt={"ssd"}
        ></Image>
      </div>
      <div className="h-50  rounded-lg  text-green-500  text-center">
        <div className="p-2 bg-green-100 rounded-lg">
          โปรดแสดง Qr Code นี้ต่อเจ้าหน้าก่อนเข้างาน <br /> (Please show this Qr
          Code to the staff before entering the event.)
        </div>
        <div className="flex justify-center">
          <SVG
            text={tkData || "3"}
            options={{
              margin: 2,
              width: 200,
              color: {
                dark: "#000000",
                light: "#FFFFFF",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Done;
