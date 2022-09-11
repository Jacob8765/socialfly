import React from "react";

function CommonWords(props) {
  return (
    <div className="bg-white p-1 w-[500px]">
      <h1 className="font-bold font-inter">Common {props.title} words:</h1>
      <div className="flex flex-row flex-wrap">
        {props.data?.map((element) => {
          return (
            <div
              className={`${props.boxClassName} min-w-[100px] flex items-center justify-center mr-3 mb-3 px-1`}
              key={element}
            >
              <p className="text-white font-montserrat text-md"> {element} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CommonWords;
