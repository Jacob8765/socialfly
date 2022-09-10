import React from "react";

function MacImage(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      enableBackground="new 0 0 504.876 504.876"
      version="1.1"
      viewBox="0 0 504.876 504.876"
      xmlSpace="preserve"
      className = {props.className}
    >
      <path
        fill="#7BB9DD"
        d="M471.438 34.146h-438C20.493 34.146 10 45.748 10 60.06v249.086h484.875V60.06c0-14.312-10.493-25.914-23.437-25.914z"
      ></path>
      <path
        fill="#D4EDF8"
        d="M10 309.146v75.669c0 14.312 10.493 25.914 23.438 25.914h438c12.944 0 23.438-11.602 23.438-25.914v-75.669H10zm242.438 68.413c-10.018 0-18.14-8.122-18.14-18.14s8.121-18.14 18.14-18.14 18.14 8.121 18.14 18.14-8.122 18.14-18.14 18.14z"
      ></path>
      <circle cx="252.438" cy="359.419" r="18.14" fill="#7BB9DD"></circle>
      <path
        fill="#D4EDF8"
        d="M294.938 470.729L209.938 470.729 229.938 410.729 274.938 410.729z"
      ></path>
      <g>
        <path d="M504.875 60.061c0-19.803-15-35.914-33.438-35.914h-438C15 24.146 0 40.258 0 60.061v324.755c0 19.803 15 35.913 33.438 35.913h182.625l-13.333 40h-25.792c-5.522 0-10 4.478-10 10s4.478 10 10 10h151c5.522 0 10-4.478 10-10s-4.478-10-10-10h-25.792l-13.333-40h182.625c18.438 0 33.438-16.11 33.438-35.913V60.061h-.001zM20 60.061c0-8.775 6.028-15.914 13.438-15.914h438c7.409 0 13.438 7.139 13.438 15.914v239.086H20V60.061zm261.063 400.668h-57.252l13.334-40h30.584l13.334 40zm203.812-75.914c0 8.774-6.028 15.913-13.438 15.913h-438c-7.409 0-13.438-7.139-13.438-15.913v-65.669h464.875l.001 65.669z"></path>
        <path d="M252.438 387.559c15.517 0 28.14-12.623 28.14-28.14s-12.623-28.14-28.14-28.14-28.14 12.623-28.14 28.14 12.623 28.14 28.14 28.14zm0-36.28c4.488 0 8.14 3.651 8.14 8.14s-3.651 8.14-8.14 8.14-8.14-3.651-8.14-8.14 3.651-8.14 8.14-8.14zM48.871 138.438c-5.522 0-10 4.478-10 10v122.356c0 5.522 4.478 10 10 10s10-4.478 10-10V148.438c0-5.523-4.477-10-10-10zM48.871 62.438c-5.522 0-10 4.478-10 10v39.469c0 5.522 4.478 10 10 10s10-4.478 10-10V72.438c0-5.523-4.477-10-10-10z"></path>
      </g>
    </svg>
  );
}

export default MacImage;