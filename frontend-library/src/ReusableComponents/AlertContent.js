
const AlertContent = ({ success,message }) => {
 
  
    return (
      <div className="grid place-items-center">
        <div
          className={`p-4 mb-4 text-sm rounded-lg w-1/5 ${
            success
              ? "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400"
              : "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400"
          }`}
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d={
                success
                  ? "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                  : "M10 2a8 8 0 1 0 8 8A8.01 8.01 0 0 0 10 2zm0 14a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6z"
              }
            />
          </svg>
          <span className="font-medium">
            {success ? "Congrats!!! " : "Something went wrong! "}
          </span>
          {success
            ? message
            : " Please try again later."}
          <span className="sr-only">{success ? "Success" : "Error"}</span>
        </div>
      </div>
    );
  };
  

  export default AlertContent;