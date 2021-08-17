import { useState } from "react";
import "./styles.css";
import girl from "./img/girl.svg";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
`;

function App() {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const [dob, setDOb] = useState("");
  const [output, setOutput] = useState({ state: false, msg: "" });
  const [loader, setLoader] = useState(false);

  const submitHandler = () => {
    setOutput({ state: false, msg: "" });
    if (dob) {
      setLoader(true);
      setTimeout(() => {
        checkPalindrome();
        setLoader(false);
      }, 3000);
    } else {
      setOutput({ state: true, msg: "Please enter proper Birthdate..." });
    }
  };

  const checkPalindrome = () => {
    let dateArray = dob.split("-");
    let dobYear = dateArray[0];
    let dobMonth = dateArray[1];
    let dobDate = dateArray[2];

    let combiChecker = checkAllSequence(dobYear, dobMonth, dobDate);

    if (combiChecker) {
      setOutput({
        state: true,
        msg: `Congrats!! your Birthdate ${dob} is Palindrome`
      });
    } else {
      let [nextdate, diff] = nextDate(dobYear, dobMonth, dobDate);
      setOutput({
        state: true,
        msg: `Sorry your Birthdate is not Palindrome, nearest palindrome date is ${nextdate} you missed it by ${diff} days.`
      });
    }
  };

  const checkAllSequence = (yyyy, mm, dd) => {
    const format1 = mm + dd + yyyy;
    const format2 = dd + mm + yyyy;
    const format3 = yyyy + mm + dd;
    const format4 = mm + dd + yyyy.substring(2);

    if (isPalindrome(format1)) {
      return `${mm}-${dd}-${yyyy}`;
    } else if (isPalindrome(format2)) {
      return `${dd}-${mm}-${yyyy}`;
    } else if (isPalindrome(format3)) {
      return `${yyyy}-${mm}-${dd}`;
    } else if (isPalindrome(format4)) {
      return `${mm}-${dd}-${yyyy.substring(2)}`;
    } else {
      return null;
    }
  };

  function isPalindrome(date) {
    let tempdate = "";
    for (let i = date.length - 1; i >= 0; i--) {
      tempdate += date.charAt(i);
    }
    if (date === tempdate) {
      return true;
    }
    return false;
  }

  function nextDate(yyyy, mm, dd) {
    let nextDateDay = Number(dd);
    let nextDateMonth = Number(mm);
    let nextDateYear = Number(yyyy);
    let prevDateDay = Number(dd);
    let prevDateMonth = Number(mm);
    let prevDateYear = Number(yyyy);

    let i = 1;
    while (i > 0) {
      nextDateDay = nextDateDay + 1;
      if (nextDateDay > Number(daysInMonth[nextDateMonth - 1])) {
        nextDateDay = 1;
        nextDateMonth = nextDateMonth + 1;
        if (nextDateMonth > 12) {
          nextDateMonth = 1;
          nextDateYear = nextDateYear + 1;
        }
      }

      let year = nextDateYear.toString();
      let date = nextDateDay.toString();
      let month = nextDateMonth.toString();

      if (date.length == 1) {
        date = "0" + date;
      }
      if (month.length == 1) {
        month = "0" + month;
      }

      let nextDateChecker = checkAllSequence(year, month, date);
      if (nextDateChecker) {
        return [nextDateChecker, i];
      }

      prevDateDay = prevDateDay - 1;
      if (prevDateDay < 1) {
        prevDateMonth = prevDateMonth - 1;
        if (prevDateMonth < 1) {
          prevDateMonth = 12;
          prevDateYear = prevDateYear - 1;
          if (prevDateYear < 1) {
            break;
          }
          prevDateDay = daysInMonth[prevDateMonth - 1];
        }
      }
      year = prevDateYear.toString();
      month = prevDateMonth.toString();
      date = prevDateDay.toString();

      if (date.length == 1) {
        date = "0" + date;
      }
      if (month.length == 1) {
        month = "0" + month;
      }

      nextDateChecker = checkAllSequence(year, month, date);
      if (nextDateChecker) {
        return [nextDateChecker, i];
      }

      i++;
    }
  }

  return (
    <>
      <div className="header">
        <div className="left">
          <img src={girl} alt="girl" />
        </div>
        <div className="right">
          <div className="data">
            <h1>
              Check out if your <span>Birthdate</span> is <span>Palidrome</span>
              .
            </h1>
            <p>
              If your Birthdate isn't Palindrome, It will show by how many days
              you have missed it!!!
            </p>
          </div>
          <div className="action">
            <input
              type="date"
              value={dob}
              onChange={(e) => setDOb(e.target.value)}
            />
            <button onClick={submitHandler}>Go</button>
          </div>

          {output.state ? (
            <div className="output">
              <h4>{output.msg}</h4>
            </div>
          ) : null}
          {loader && (
            <div className="output">
              <HashLoader css={override} size={80} color={`#fb5607`} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
