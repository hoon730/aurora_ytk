import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 150px;
  }
`;

const Loading = () => {
  return (
    <Wrapper>
      <motion.svg
        width="392"
        height="188"
        viewBox="0 0 392 188"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M315.852 169.103C308.822 169.103 304.151 165.445 301.839 158.13C301.205 156.135 300.889 153.886 300.889 151.385C300.889 148.566 301.285 145.447 302.076 142.027C303.66 135.344 306.035 129.977 309.202 125.923C314.902 118.608 321.299 114.95 328.393 114.95C335.55 114.95 340.221 118.608 342.406 125.923C343.008 127.95 343.309 130.198 343.309 132.668C343.309 135.487 342.913 138.606 342.121 142.027L337.988 159.888C337.672 161.281 338.273 161.978 339.793 161.978H343.451L343.356 162.453L338.036 170.053C331.417 170.053 328.108 167.678 328.108 162.928C328.108 162.009 328.234 160.996 328.488 159.888L332.621 142.027C333.507 138.1 333.951 134.917 333.951 132.478C333.951 131.275 333.84 130.214 333.618 129.296C332.446 125.116 330.071 123.025 326.493 123.025C322.914 123.025 319.589 125.116 316.517 129.296C314.585 131.924 312.939 136.168 311.577 142.027C310.69 145.858 310.247 148.994 310.247 151.432C310.247 152.73 310.373 153.839 310.627 154.757C311.767 158.906 314.11 160.996 317.657 161.028H321.315L321.172 161.503L315.852 169.103Z"
          fill="#EAEAEA"
        />
        <path
          d="M267.889 170.053L274.349 142.027C275.869 135.408 278.244 130.04 281.474 125.923C287.206 118.608 293.588 114.95 300.618 114.95H307.031L306.888 115.425L301.521 123.025H298.718C295.139 123.025 291.814 125.116 288.742 129.296C286.842 131.893 285.211 136.136 283.85 142.027L278.387 165.778L268.364 170.053H267.889Z"
          fill="#EAEAEA"
        />
        <path
          d="M235.624 142.027C234.738 145.953 234.294 149.136 234.294 151.575C234.294 152.81 234.405 153.871 234.627 154.757C235.83 158.938 238.205 161.028 241.752 161.028C245.299 161.028 248.624 158.938 251.728 154.757C253.691 152.097 255.338 147.854 256.668 142.027C257.555 138.131 257.998 134.964 257.998 132.526C257.998 131.228 257.871 130.151 257.618 129.296C256.541 125.116 254.166 123.025 250.493 123.025C246.787 123.025 243.415 125.147 240.375 129.391C238.538 131.956 236.954 136.168 235.624 142.027ZM226.124 142.074C227.644 135.424 230.019 130.04 233.249 125.923C238.981 118.608 245.362 114.95 252.393 114.95C259.423 114.95 264.094 118.608 266.406 125.923C267.039 127.918 267.356 130.167 267.356 132.668C267.356 135.424 266.96 138.543 266.169 142.027C264.553 148.804 262.178 154.171 259.043 158.13C253.248 165.445 246.851 169.103 239.852 169.103C232.948 169.103 228.277 165.461 225.839 158.177C225.205 156.246 224.889 154.092 224.889 151.717C224.889 148.93 225.3 145.716 226.124 142.074Z"
          fill="#EAEAEA"
        />
        <path
          d="M192.889 170.053L199.349 142.027C200.869 135.408 203.244 130.04 206.474 125.923C212.206 118.608 218.588 114.95 225.618 114.95H232.031L231.888 115.425L226.521 123.025H223.718C220.139 123.025 216.814 125.116 213.742 129.296C211.842 131.893 210.211 136.136 208.85 142.027L203.387 165.778L193.364 170.053H192.889Z"
          fill="#EAEAEA"
        />
        <path
          d="M197.534 114L191.074 142.027C189.553 148.645 187.178 154.013 183.948 158.13C178.216 165.446 171.835 169.103 164.805 169.103C157.552 169.103 152.881 165.446 150.791 158.13C150.19 156.008 149.889 153.696 149.889 151.195C149.889 148.345 150.269 145.288 151.029 142.027C152.834 134.331 157.347 128.314 164.567 123.976L152.999 123.976L153.094 123.501L156.389 115.9L180.48 115.9L180.385 116.375L175.065 123.976C170.632 126.636 167.417 129.233 165.422 131.766C163.047 134.806 161.416 138.226 160.529 142.027C159.643 145.859 159.199 148.994 159.199 151.432C159.199 152.731 159.326 153.839 159.579 154.757C160.719 158.938 163.094 161.028 166.705 161.028C170.283 161.028 173.608 158.938 176.68 154.757C178.58 152.161 180.211 147.917 181.573 142.027L187.036 118.275L197.059 114H197.534Z"
          fill="#EAEAEA"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.7425 187.185C8.75541 187.185 6.23179 186.567 4.1717 185.331C1.39057 183.786 0 181.365 0 178.069C0.61803 180.335 5.97428 183.168 9.57944 183.168C15.0387 183.168 21.528 179.511 29.0474 172.198C31.8285 169.52 34.8156 166.275 38.0088 162.464C41.0989 158.756 44.3436 154.43 47.7427 149.485C50.0088 146.189 52.2234 142.945 54.3865 139.751C56.5496 136.455 58.7642 133.159 61.0303 129.863C53.511 118.326 49.7513 107.459 49.7513 97.262C49.7513 91.3907 51.0904 86.6525 53.7685 83.0474C56.5496 79.4422 60.1033 77.6396 64.4295 77.6396C72.4639 77.6396 80.8588 83.2019 89.6142 94.3264C99.5026 84.1289 109.597 75.4765 119.898 68.3692C133.7 58.7897 145.082 54 154.044 54C157.649 54 159.451 54.7725 159.451 56.3176C159.451 56.7296 159.297 57.2447 158.988 57.8627C135.812 99.3736 122.833 127.545 120.052 142.378C119.846 143.82 119.64 145.159 119.434 146.395C119.331 147.631 119.28 148.764 119.28 149.794C119.28 156.284 121.906 159.528 127.159 159.528C132.516 159.528 143.485 143.461 153.167 123.273C153.579 122.242 154.146 121.624 154.867 121.418H155.021C155.433 121.418 155.639 121.779 155.639 122.5C155.639 123.118 155.382 123.942 154.867 124.972C151.983 130.74 146.215 141.297 144.464 144.696C142.816 148.095 141.683 150.258 141.065 151.185C138.181 155.717 135.297 159.065 132.413 161.228C129.529 163.391 126.696 164.473 123.915 164.473C120.413 164.473 117.065 163.134 113.872 160.455C109.855 156.953 107.64 152.061 107.228 145.777C104.447 128.884 98.3181 114.464 88.8416 102.515C85.5455 106.017 82.0433 110.086 78.3351 114.721C74.73 119.357 70.8673 124.558 66.7471 130.327C71.4853 137.846 76.8931 144.799 82.9704 151.185C89.1506 157.571 96.0005 163.34 103.52 168.49C104.241 168.902 104.601 169.417 104.601 170.035C104.601 170.859 104.292 171.271 103.674 171.271C103.365 171.271 102.902 171.116 102.284 170.807C99.3996 169.056 96.4125 166.945 93.3223 164.473C90.2322 162.104 86.9875 159.322 83.5884 156.129C79.7772 152.627 76.2235 149.073 72.9274 145.468C69.7342 141.76 66.7471 138 63.966 134.189C56.9616 144.078 51.3994 151.855 47.2792 157.52C43.262 163.185 40.6869 166.739 39.5538 168.181C31.1074 178.687 23.8456 184.713 17.7683 186.258C15.8112 186.876 13.8026 187.185 11.7425 187.185ZM110.936 126.464C109.803 129.348 108.928 132.129 108.31 134.807C104.91 121.108 99.7086 109.005 92.7043 98.4981C95.8975 95.3049 99.3481 92.1633 103.056 89.0731C106.764 85.88 110.833 82.7383 115.262 79.6482C126.284 72.0258 134.782 68.2147 140.756 68.2147C142.713 68.2147 143.692 68.8842 143.692 70.2233C143.692 71.3563 143.177 72.6439 142.147 74.0859C133.185 87.1675 124.275 101.588 115.417 117.348C113.666 120.438 112.172 123.477 110.936 126.464ZM75.245 110.704C71.7428 115.236 67.9832 120.232 63.966 125.691C60.0518 118.069 58.0947 110.704 58.0947 103.597C58.0947 99.0646 59.0217 95.3564 60.8758 92.4723C62.6269 89.6912 65.0475 88.3006 68.1377 88.3006C73.1849 88.3006 78.9532 91.7513 85.4425 98.6526C82.2493 102.155 78.8502 106.172 75.245 110.704Z"
          fill="#EAEAEA"
        />
        <motion.g
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 720 }}
          transition={{
            duration: 0.8,
            delay: 0.7,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0.7,
          }}
        >
          <path
            d="M377.889 125.979L377.889 160L370.889 159.021L370.889 125L377.889 125.979Z"
            fill="#EAEAEA"
          />
          <path
            d="M377.889 125.979L377.889 160L370.889 159.021L370.889 125L377.889 125.979Z"
            fill="#EAEAEA"
          />
          <path
            d="M390.91 146L356.889 146L357.868 139L391.889 139L390.91 146Z"
            fill="#EAEAEA"
          />
          <path
            d="M390.91 146L356.889 146L357.868 139L391.889 139L390.91 146Z"
            fill="#EAEAEA"
          />
        </motion.g>
        <defs>
          <clipPath id="clip">
            <motion.rect
              initial={{ width: 0 }}
              width="0"
              height="1000"
              animate={{ width: 1000 }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0.8,
              }}
            />
          </clipPath>
        </defs>
        <motion.path
          d="M237.631 7C304.596 7 360.13 48.9375 370.422 113L377.508 114C367.151 46.0551 308.47 0 237.631 0C189.863 0 147.622 23.6705 122 59.9221L127.111 55.5C151.089 29.3267 197.393 7 237.631 7Z"
          fill="url(#paint0_linear_15_148)"
          clipPath="url(#clip)" // clipPath 적용
        />
        <defs>
          <linearGradient
            id="paint0_linear_15_148"
            x1="118"
            y1="66"
            x2="355"
            y2="57"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#02D6E8" stopOpacity="0" />
            <stop offset="0.5" stopColor="#02D6E8" stopOpacity="0.51" />
            <stop offset="1" stopColor="#5E66FF" />
          </linearGradient>
        </defs>
      </motion.svg>
    </Wrapper>
  );
};

export default Loading;
