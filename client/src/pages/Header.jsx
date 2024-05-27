import React from "react";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem } from "@mui/base/MenuItem";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

function Header() {
  const createHandleMenuClick = (menuItem) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  return (
    <div className="text-black shadow-inner">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        <div className="flex justify-center space-x-6">
          <section className="flex justify-center items-center">
            <a
              href="https://www.facebook.com/SPITCOLLEGE/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex justify-center p-1 rounded-md drop-shadow-xl bg-gradient-to-r from-gray-800 to-black text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
            >
              <FaFacebook className="w-5 h-5" />
              <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700">
                Facebook
              </span>
            </a>
          </section>
          <section className="flex justify-center items-center">
            <a
              href="https://twitter.com/bvbspit"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex justify-center p-1 rounded-md drop-shadow-xl bg-gradient-to-r from-gray-800 to-black text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
            >
              <FaTwitter className="w-5 h-5" />
              <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700">
                X
              </span>
            </a>
          </section>
          <section className="flex justify-center items-center">
            <a
              href="https://www.linkedin.com/school/bhartiya-vidya-bhavans-sardar-patel-institute-of-technology-munshi-nagar-andheri-mumbai/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex justify-center p-1 rounded-md drop-shadow-xl bg-gradient-to-r from-gray-800 to-black text-white font-semibold hover:translate-y-3 hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413]"
            >
              <FaLinkedin className="w-5 h-5" />
              <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-10 duration-700">
                LinkedIn
              </span>
            </a>
          </section>
        </div>
        <div></div> {/* Spacer */}
        <Dropdown>
          <BaseMenuButton className="relative">
            <img
              className="h-10 w-10 rounded-full cursor-pointer"
              src="https://i.pinimg.com/originals/13/ac/c5/13acc5169bb5040b48a38168be255cde.jpg"
              alt="Profile"
            />
          </BaseMenuButton>
          <Menu className="mt-2 rounded-md border border-gray-300 shadow-md">
            <BaseMenuItem onClick={createHandleMenuClick("Profile")}>
              <Link
                to="/account"
                className="block px-4 py-2 text-sm hover:bg-gray-300 w-full text-left"
              >
                Account
              </Link>
            </BaseMenuItem>
            <BaseMenuItem onClick={createHandleMenuClick("Log out")}>
              <Link
                to="/"
                className="block px-4 py-2 text-sm hover:bg-gray-300 w-full text-left"
              >
                Logout
              </Link>
            </BaseMenuItem>
          </Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;
