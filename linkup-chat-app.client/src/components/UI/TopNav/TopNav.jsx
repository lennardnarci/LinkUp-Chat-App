import React, { useEffect, useState } from "react";
import "./TopNav.css";

const TopNav = ({ roomName }) => {
  return (
    <div className="top-nav-bar">
      <svg
        className="burger-icon"
        width="48"
        height="48"
        viewBox="0 0 18 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 12V10H18V12H0ZM0 7V5H18V7H0ZM0 2V0H18V2H0Z"
          fill="#1D1B20"
        />
      </svg>
      <h1 className="top-nav-header">{roomName}</h1>
      <svg
        className="settings-icon"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_14_196)">
          <path
            d="M25.5031 34H22.4994C22.315 34 22.1371 33.9319 22.0001 33.8086C21.863 33.6853 21.7764 33.5157 21.757 33.3323L21.5346 31.2383C21.2241 31.1327 20.9208 31.007 20.6265 30.8622L18.99 32.1856C18.8468 32.3009 18.666 32.3593 18.4824 32.3496C18.2987 32.3399 18.1252 32.2627 17.9949 32.1328L15.8708 30.009C15.741 29.8787 15.6638 29.7052 15.6541 29.5215C15.6443 29.3379 15.7027 29.1571 15.8181 29.0139L17.1421 27.3756C16.997 27.0814 16.8712 26.7782 16.7654 26.4677L14.6677 26.2438C14.4845 26.2244 14.3149 26.1379 14.1916 26.0009C14.0683 25.864 14.0001 25.6862 14 25.502V22.498C14.0001 22.3138 14.0683 22.136 14.1916 21.9991C14.3149 21.8621 14.4845 21.7756 14.6677 21.7562L16.762 21.5338C16.8677 21.2233 16.9935 20.92 17.1386 20.6259L15.8146 18.9876C15.6993 18.8443 15.6408 18.6636 15.6506 18.48C15.6603 18.2963 15.7375 18.1228 15.8673 17.9925L17.9914 15.8687C18.1217 15.7388 18.2953 15.6616 18.4789 15.6519C18.6626 15.6422 18.8433 15.7006 18.9866 15.8159L20.625 17.1393C20.9193 16.9945 21.2226 16.8688 21.5331 16.7632L21.7555 14.6692C21.7746 14.4853 21.8612 14.3151 21.9987 14.1915C22.1361 14.0679 22.3145 13.9996 22.4994 14H25.5031C25.6875 14 25.8653 14.0681 26.0024 14.1914C26.1395 14.3147 26.2261 14.4843 26.2455 14.6677L26.4674 16.7617C26.7781 16.8673 27.0815 16.993 27.376 17.1378L29.0139 15.8144C29.1572 15.6991 29.3379 15.6407 29.5216 15.6504C29.7052 15.6601 29.8788 15.7373 30.0091 15.8672L32.1331 17.991C32.263 18.1213 32.3402 18.2948 32.3499 18.4785C32.3597 18.6621 32.3012 18.8429 32.1859 18.9861L30.8619 20.6244C31.0068 20.9186 31.1326 21.2219 31.2385 21.5323L33.3328 21.7547C33.5159 21.7742 33.6854 21.8608 33.8086 21.9977C33.9317 22.1347 33.9999 22.3123 34 22.4965V25.5005C34.0004 25.6846 33.9326 25.8624 33.8098 25.9996C33.687 26.1368 33.5178 26.2238 33.3348 26.2438L31.2405 26.4662C31.1346 26.7766 31.0087 27.0799 30.8639 27.3741L32.1879 29.0124C32.3032 29.1557 32.3616 29.3364 32.3519 29.52C32.3422 29.7037 32.265 29.8772 32.1351 30.0075L30.011 32.1328C29.8808 32.2627 29.7072 32.3399 29.5236 32.3496C29.3399 32.3593 29.1591 32.3009 29.0159 32.1856L27.3779 30.8622C27.0835 31.007 26.78 31.1327 26.4694 31.2383L26.2475 33.3323C26.228 33.516 26.1412 33.6859 26.0037 33.8092C25.8662 33.9326 25.6878 34.0005 25.5031 34ZM23.1696 32.5075H24.8309L25.0344 30.5891C25.0504 30.4389 25.1115 30.2971 25.2098 30.1824C25.3081 30.0678 25.4388 29.9856 25.5847 29.9468C26.1104 29.8066 26.6151 29.5969 27.0854 29.3234C27.2163 29.2471 27.3674 29.2125 27.5185 29.2241C27.6696 29.2358 27.8135 29.2931 27.9312 29.3886L29.4319 30.601L30.6066 29.4264L29.3921 27.9303C29.2966 27.8127 29.2393 27.6687 29.2276 27.5176C29.216 27.3665 29.2506 27.2155 29.3269 27.0846C29.5999 26.6146 29.8089 26.1104 29.9484 25.5851C29.9872 25.4391 30.0695 25.3083 30.1842 25.21C30.299 25.1118 30.4409 25.0507 30.5912 25.0348L32.5093 24.8308V23.1697L30.5912 22.9657C30.4409 22.9498 30.299 22.8887 30.1842 22.7905C30.0695 22.6922 29.9872 22.5614 29.9484 22.4154C29.809 21.89 29.6 21.3855 29.3269 20.9154C29.2506 20.7845 29.216 20.6335 29.2276 20.4824C29.2393 20.3313 29.2966 20.1873 29.3921 20.0697L30.6046 18.5692L29.4299 17.3945L27.9292 18.607C27.8115 18.7024 27.6676 18.7598 27.5165 18.7714C27.3654 18.7831 27.2143 18.7484 27.0834 18.6721C26.6133 18.3993 26.109 18.1904 25.5837 18.0507C25.4378 18.0119 25.3071 17.9298 25.2088 17.8151C25.1106 17.7004 25.0494 17.5586 25.0334 17.4085L24.8319 15.4925H23.1696L22.9661 17.4109C22.9501 17.5612 22.8888 17.703 22.7905 17.8177C22.6921 17.9324 22.5613 18.0145 22.4153 18.0532C21.8904 18.1935 21.3865 18.4031 20.9171 18.6766C20.7862 18.7529 20.6351 18.7875 20.484 18.7759C20.3329 18.7642 20.189 18.7069 20.0712 18.6114L18.5721 17.397L17.3979 18.5716L18.6109 20.0721C18.7063 20.1899 18.7636 20.3339 18.7751 20.4849C18.7867 20.636 18.752 20.787 18.6756 20.9179C18.403 21.388 18.194 21.8923 18.0541 22.4174C18.0153 22.5633 17.9331 22.6941 17.8184 22.7923C17.7038 22.8906 17.562 22.9517 17.4118 22.9677L15.4932 23.1716V24.8323L17.4118 25.0363C17.562 25.0523 17.7038 25.1134 17.8184 25.2117C17.9331 25.3099 18.0153 25.4406 18.0541 25.5866C18.194 26.1112 18.4028 26.6149 18.6751 27.0846C18.7515 27.2155 18.7862 27.3665 18.7746 27.5175C18.7631 27.6686 18.7058 27.8126 18.6104 27.9303L17.3979 29.4284L18.5726 30.603L20.0737 29.3905C20.1914 29.2951 20.3354 29.2377 20.4865 29.2261C20.6376 29.2145 20.7887 29.2491 20.9196 29.3254C21.3895 29.5982 21.8936 29.8072 22.4187 29.9468C22.5648 29.9855 22.6956 30.0676 22.794 30.1823C22.8923 30.297 22.9535 30.4388 22.9695 30.5891L23.1696 32.5075Z"
            fill="#1D1B20"
          />
          <path
            d="M23.9996 28C23.2085 27.9999 22.4351 27.7652 21.7774 27.3257C21.1197 26.8861 20.607 26.2613 20.3044 25.5304C20.0017 24.7995 19.9225 23.9953 20.0769 23.2194C20.2313 22.4435 20.6123 21.7308 21.1717 21.1714C21.7312 20.6121 22.4439 20.2311 23.2198 20.0768C23.9957 19.9225 24.8 20.0018 25.5308 20.3045C26.2617 20.6073 26.8864 21.12 27.3259 21.7778C27.7654 22.4356 28 23.2089 28 24C27.9988 25.0606 27.577 26.0774 26.827 26.8273C26.077 27.5772 25.0601 27.999 23.9996 28ZM23.9996 21.3135C23.4682 21.3136 22.9489 21.4712 22.5071 21.7665C22.0654 22.0617 21.7211 22.4813 21.5179 22.9722C21.3146 23.4631 21.2615 24.0033 21.3652 24.5244C21.4689 25.0455 21.7248 25.5241 22.1005 25.8998C22.4762 26.2755 22.9549 26.5313 23.476 26.6349C23.9972 26.7386 24.5373 26.6853 25.0282 26.482C25.5191 26.2786 25.9386 25.9343 26.2338 25.4925C26.529 25.0507 26.6865 24.5313 26.6865 24C26.6857 23.2877 26.4023 22.6047 25.8986 22.1011C25.3949 21.5974 24.7119 21.3142 23.9996 21.3135Z"
            fill="#1D1B20"
          />
        </g>
        <defs>
          <clipPath id="clip0_14_196">
            <rect x="4" y="4" width="40" height="40" rx="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default TopNav;
