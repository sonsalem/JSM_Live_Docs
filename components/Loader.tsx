import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="Loader w-fit my-5 mx-auto">
      <Image
        src="/assets/icons/loader.svg"
        alt="loading image"
        width={50}
        height={50}
        className="animate-spin mb-4 mx-auto"
      />
      Loading...
    </div>
  );
};

export default Loader;
