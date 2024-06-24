import { useState } from 'react';
import { animatedBackground } from '../constants/styles.js';

type DropdownProps = {
  optionList: Record<string, string[]>;
  onChange?: (key: string, value: string) => void;
  selected: string;
};

const Dropdown = (props: DropdownProps) => {
  const optionList = {
    groq: ['llama3-8b-8192', 'llama3-70b-8192', 'mixtral-8x7b-32768'],
  };

  const [toggle, setToggle] = useState(false);

  const AIBrands = Object.keys(optionList) || [];

  const toCapitalize = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const toggleDropdown = () => {
    setToggle(!toggle);
  };

  const selectModel = (objKey, value) => {
    props.onChange(objKey, value);
    setToggle(false);
  };

  return (
    <>
      <button
        data-dropdown-toggle="multi-dropdown"
        className={`flex justify-between ${animatedBackground} px-10 py-4 my-2  text-white font-bold rounded-md`}
        type="button"
        onClick={toggleDropdown}
      >
        <span className="px-2 self-start">
          {/* @ts-ignore */}
          {props.selected || 'Model'}
        </span>
        <svg
          className="w-2.5 h-2.5 ms-3 self-center justify-end"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="multi-dropdown"
        className={`p-[2px] ${animatedBackground}z-10 bg-white divide-y divide-gray-100 rounded-md shadow w-44 fixed right-4 overflow-hidden ${
          toggle ? 'block' : 'hidden'
        }`}
      >
        <div className="">
          <ul
            className="text-sm text-gray-700 dark:text-gray-200 text-center list-none rounded-md"
            aria-labelledby="multiLevelDropdownButton"
          >
            {AIBrands.map((option, i) => (
              <li
                key={i}
                className="list-none rounded-md overflow-hidden flex gap-2"
              >
                {optionList[option].length > 0 ? (
                  <div className="w-full">
                    <a
                      href="#"
                      id="doubleDropdownButton"
                      data-dropdown-toggle="doubleDropdown"
                      data-dropdown-placement="right-start"
                      type="button"
                      // not hoverrable
                      className="bg-slate-900 cursor-not-allowed flex items-center justify-between w-full px-4 py-2"
                    >
                      {toCapitalize(option)}
                    </a>
                    <div
                      id="doubleDropdown"
                      className="z-10 divide-y divide-gray-100 "
                    >
                      <ul
                        className=" text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="doubleDropdownButton"
                      >
                        {optionList[option].map((list) => (
                          <li onClick={() => selectModel(option, list)}>
                            <a
                              href="#"
                              className="bg-slate-800 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              {toCapitalize(list)}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-not-allowed"
                  >
                    {toCapitalize(option)}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
