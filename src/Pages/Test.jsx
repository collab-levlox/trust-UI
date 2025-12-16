import { useState } from "react";

function App() {
  // state to store user input and result
  const [numbers, setNumbers] = useState("");
  const [countResult, setCountResult] = useState({});

  // function to count how many times each number appears
  const handleCount = () => {
    // convert input string to number array
    const numArray = numbers
      .split(",") // split by comma
      .map((n) => parseInt(n.trim())) // remove spaces & convert to number
      .filter((n) => !isNaN(n)); // remove invalid entries

    // create an empty object to store count
    const countObj = {};

    // loop through array and count each number
    numArray.forEach((num) => {
      if (countObj[num]) {
        countObj[num] += 1;
      } else {
        countObj[num] = 1;
      }
    });

    // store result in state
    setCountResult(countObj);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>Number Frequency Counter (1 - 100)</h2>

      {/* Input field */}
      <input
        type="text"
        placeholder="Enter numbers like 10,20,10,30"
        value={numbers}
        onChange={(e) => setNumbers(e.target.value)}
        style={{
          width: "300px",
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginRight: "10px",
        }}
      />

      {/* Button */}
      <button
        onClick={handleCount}
        style={{
          padding: "8px 15px",
          borderRadius: "5px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Count
      </button>

      {/* Result */}
      <div style={{ marginTop: "20px" }}>
        <h3>Result:</h3>
        {Object.keys(countResult).length === 0 ? (
          <p>No result yet</p>
        ) : (
          <ul>
            {Object.entries(countResult).map(([num, count]) => (
              <li key={num}>
                Number <strong>{num}</strong> appeared{" "}
                <strong>{count}</strong> time{count > 1 ? "s" : ""}.
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;






// import React, { useState } from "react";
// export default function OddEvenSquares() {
//   const [result, setResult] = useState("");

//   function calculate() {
//     let input = document.getElementById("numbers").value;
//     let array = input.split(",").map(n => parseInt(n.trim())).filter(n => !isNaN(n));
//     let multiplied = array.map(num => num * num);
//     let evenNumbers = multiplied.filter(num => num % 2 === 0);
//     let oddNumbers = multiplied.filter(num => num % 2 !== 0);

//   setResult(`Multiplied Values: [${multiplied.join(", ")}]
// Even Numbers: ${evenNumbers.join(", ")}
// Odd Numbers: ${oddNumbers.join(", ")}`);
//   }

//   return (
//     <div>
//       <input type="text" id="numbers" placeholder="Enter numbers" style={{ marginRight: "10px" }}/>
//       <button onClick={calculate}>Show Result</button>
//       <pre style={{ marginTop: "20px", padding: "10px" }}>{result}</pre>
//     </div>
//   );
// }







// import { useState } from "react";

// function App() {
//   const [input, setInput] = useState("");
//   const [result, setResult] = useState([]);

//   const handleCheck = () => {
//     // Convert input string to number array
//     const numbers = input
//       .split(",")
//       .map((n) => parseInt(n.trim()))
//       .filter((n) => !isNaN(n));

//     const repeatedInfo = [];

//     // Find repeated numbers and their positions
//     for (let i = 0; i < numbers.length; i++) {
//       const current = numbers[i];
//       const prev = numbers[i - 1];
//       const next = numbers[i + 1];

//       // check if the number is repeated somewhere else
//       const count = numbers.filter((n) => n === current).length;
//       if (count > 1) {
//         repeatedInfo.push({
//           number: current,
//           previous: prev !== undefined ? prev : "No previous",
//           next: next !== undefined ? next : "No next",
//         });
//       }
//     }

//     setResult(repeatedInfo);
//   };

//   return (
//     <div style={{ padding: "30px", fontFamily: "Arial" }}>
//       <h2>Find Repeated Numbers and Their Neighbours</h2>

//       <input
//         type="text"
//         placeholder="Enter numbers like 1,2,3,4,5,3,7"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         style={{
//           width: "300px",
//           padding: "8px",
//           borderRadius: "5px",
//           border: "1px solid #ccc",
//           marginRight: "10px",
//         }}
//       />
//       <button
//         onClick={handleCheck}
//         style={{
//           padding: "8px 15px",
//           borderRadius: "5px",
//           backgroundColor: "#007bff",
//           color: "white",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         Check
//       </button>

//       <div style={{ marginTop: "20px" }}>
//         <h3>Result:</h3>
//         {result.length === 0 ? (
//           <p>No repeated numbers found.</p>
//         ) : (
//           <ul>
//             {result.map((item, index) => (
//               <li key={index}>
//                 Number <strong>{item.number}</strong> → Previous:{" "}
//                 <strong>{item.previous}</strong>, Next:{" "}
//                 <strong>{item.next}</strong>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;









