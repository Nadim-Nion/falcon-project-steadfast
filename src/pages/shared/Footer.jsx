import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaEnvelope,
} from "react-icons/fa";
import googlePlay from "../../assets/images/Google.png";
import appStore from "../../assets/images/apple.png";
import falcon from "../../assets/images/falcon.png";
import { HiOutlineLocationMarker } from "react-icons/hi";
import IconTextItem from "../../components/IconTextItem";
import { IoIosCall } from "react-icons/io";
import { FaHeadphones } from "react-icons/fa";
import { GiHummingbird } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Brand & Contact */}
        <div>
          <img
            src={falcon}
            alt="Falcon Logo"
            className="w-32 sm:w-40 md:w-44"
          />
          <p className="my-6 text-sm leading-relaxed">
            Experience our new platform & Enjoy exciting deals and offers on
            your day to day
          </p>
          <div className="space-y-3 mb-6 text-sm">
            <IconTextItem
              icon={HiOutlineLocationMarker}
              text={"House #64, Road 13, ASA Center, Uttara, Dhaka-1402"}
            />
            <IconTextItem icon={IoIosCall} text={"01729‑1497201"} />
            <IconTextItem icon={FaEnvelope} text={"falcon@gmail.com"} />
          </div>
        </div>

        {/* About */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm md:text-base">
            ABOUT
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              "Contact Us",
              "About Us",
              "Careers",
              "Press",
              "Cancellation & Returns",
              "Terms of Use",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-white cursor-pointer transition-colors"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm md:text-base">
            HELP
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              "Payments",
              "Shipping",
              "My Orders",
              "FAQs",
              "Terms of Use",
              "Security",
              "Privacy",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-white cursor-pointer transition-colors"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Support & Apps */}
        <div className="sm:col-span-2 xl:col-span-1">
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-4 text-sm md:text-base">
              Need Support?
            </h3>
            <a
              href="tel:10724-7814XX"
              className="inline-flex items-center space-x-3 bg-slate-800 px-4 py-2.5 rounded-md hover:bg-slate-700 transition-colors text-sm"
            >
              <FaHeadphones className="w-6 h-6 text-green-500" />
              <span>10724-7814XX</span>
            </a>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm md:text-base">
              DOWNLOAD APP
            </h3>
            <div className="flex flex-col space-y-3">
              {[googlePlay, appStore].map((img, i) => (
                <a href="#" key={i} className="block w-fit">
                  <div className="bg-black rounded-lg px-4 py-2 flex items-center space-x-3 w-36 sm:w-40 hover:bg-gray-800 transition-colors">
                    <img src={img} alt="" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Follow Us + Payments */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 px-4 sm:px-8 lg:px-16 3xl:px-40">
        {/* Social Icons */}
        <div className="flex items-center space-x-4">
          <span className="text-gray-300 text-sm">Follow us on</span>
          <div className="flex space-x-3">
            {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
              <div
                key={i}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer group"
              >
                <Icon className="w-5 h-5 text-gray-800 group-hover:text-blue-600 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
          <span className="text-gray-300 text-sm font-light w-full text-center sm:w-auto sm:text-left">
            PAYMENTS ACCEPTED
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {/* Visa */}
            <div className="bg-white rounded px-3 py-2 shadow-sm">
              <div className="text-blue-600 font-bold text-sm tracking-wider">
                VISA
              </div>
            </div>
            {/* Mastercard */}
            <div className="bg-white rounded px-3 py-2 shadow-sm flex items-center">
              <div className="relative flex items-center">
                <div className="w-5 h-5 bg-red-500 rounded-full"></div>
                <div className="w-5 h-5 bg-yellow-400 rounded-full -ml-2"></div>
              </div>
            </div>
            {/* Amex */}
            <div className="bg-blue-600 rounded px-2 py-2 shadow-sm">
              <div className="text-white font-bold text-xs text-center">
                AMERICAN <br /> EXPRESS
              </div>
            </div>
            {/* bKash */}
            <div className="bg-white rounded px-3 py-2 shadow-sm flex items-center space-x-1">
              <span className="text-pink-600 font-bold text-sm">b</span>
              <span className="text-black font-bold text-sm">Kash</span>
            </div>
            {/* Nagad */}
            <div className="bg-white rounded px-3 py-2 shadow-sm flex items-center space-x-2">
              <div className="w-5 h-5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-orange-600 font-bold text-sm">নগদ</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700 mt-10 pt-6"></div>

      <div className="mt-6 text-center">
        <p className="text-sm text-slate-500">Falcon ©2025. Design by xyz</p>
      </div>
    </footer>
  );
};

export default Footer;
