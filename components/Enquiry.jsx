"use client";

import { useState } from "react";
import { notification } from "antd";
import Image from "next/image";
import postEnquiry from "@utils/postEnquiry";
import messages from "@public/images/messages.png";
import data from "@public/assets/data.json";

export default function Enquiry() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const [api, contextHolder] = notification.useNotification({
    placement: "top",
  });
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
      description: "Our team will contact with you at the earliest",
      duration: 2.5,
      closeIcon: false,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    openNotificationWithIcon("success", "Response recieved");
    const copyFormData = { ...formData };
    setFormData({
      name: "",
      email: "",
      number: "",
      message: "",
    });

    // post request to api
    try {
      const data = await postEnquiry(copyFormData);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div id="enquiry" className="w-full bg-background bg-contain ">
      {contextHolder}
      <div className="py-20 sm:gap-x-20 px-6 sm:px-10 md:px-14 lg:px-36 flex flex-col gap-y-2 sm:flex-row backdrop-blur-md bg-zinc-400/80">
        <div className="sm:w-1/2">
          <div>
            <h2 className="text-black mb-6 sm:text-left text-center text-4xl sm:text-[50px] md-text-[65px] font-bold font-popins sm:leading-[1.4]">
              Share Your Queries With Us
            </h2>
            <Image
              alt="messages"
              src={messages}
              width={60}
              height={60}
              className="hidden sm:block mb-2"
            />
          </div>
          <p className="hidden sm:block text-xs sm:text-sm md:text-lg text-left text-gray-800">
            {data.sharequeries}
          </p>
        </div>

        <div className="my-2 max-xs:mt-5 sm:w-1/2 p-6 lg:p-12 shadow-2xl bg-white rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full text-sm rounded-lg border border-gray-300 p-3 text-gray-800 hover:border-black "
              placeholder="Name"
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                className="col-span-2 w-full text-sm rounded-lg border border-gray-300 p-3 text-gray-800 hover:border-black"
                placeholder="Email address"
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <input
                className="col-span-2 w-full text-sm rounded-lg border border-gray-300 p-3 text-gray-800 hover:border-black"
                placeholder="Phone Number"
                type="tel"
                name="number"
                id="number"
                value={formData.number}
                onChange={handleChange}
              />
            </div>

            <textarea
              className="w-full text-sm rounded-lg border border-gray-300 p-3 text-gray-800 hover:border-black"
              placeholder="Message"
              rows="12"
              name="message"
              id="message"
              required
              value={formData.message}
              onChange={handleChange}
            />

            <div className="mt-4">
              <button
                type="submit"
                className="inline-block w-full rounded-lg bg-[#080621] px-5 py-2 font-medium text-white lg:w-auto"
              >
                Send Enquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
