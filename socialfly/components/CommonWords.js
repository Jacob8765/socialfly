import React from "react";

function CommonWords(props) {
  return (
    <div className="bg-white p-1 min-w-full">
      <h1 className="font-bold font-inter">Common {props.title} words:</h1>
      <div className="grid-cols-4 grid">
        {props.data?.map((element) => {
          return (
            <div
              className={`${props.boxClassName} min-w-[100px] flex items-center justify-center mr-3 mb-3`}
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
