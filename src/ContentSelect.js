import React, { useEffect, useState } from "react";

export default function ContentSelect({
  allOptions,
  selectedOptions,
  setSelectedOptions,
}) {
  const [filteredOption, setFilteredOption] = useState(allOptions);
  const [isHidden, setIsHidden] = useState(true);
  const [searchStr, setSearchStr] = useState("");
  const [hoveredOption, setHoveredOption] = useState(null);
  const [backspaceCount, setBackSpaceCount] = useState(2);
  const [noSearchRes, setNoSearchRes] = useState(false);

  useEffect(() => {
    let tempArray = filteredOption.filter((option) =>
      option.name.toLowerCase().includes(searchStr.toLowerCase())
    );
    if (tempArray.length == 0) setNoSearchRes(true);
    else setNoSearchRes(false);

    if (searchStr != "") setIsHidden(false);
  }, [searchStr]);

  const handleAddClick = (val) => {
    setSelectedOptions((prev) => [...prev, val]);
    setFilteredOption((prev) => prev.filter((option) => option !== val));
    setSearchStr("");
  };

  const handleRemoveClick = (val) => {
    setFilteredOption((prev) => [...prev, val]);
    setSelectedOptions((prev) => prev.filter((option) => option !== val));
  };

  useEffect(() => {
    if (backspaceCount == 0) {
      if (selectedOptions.length > 0) {
        const lastSelected = selectedOptions[selectedOptions.length - 1];
        setSelectedOptions((prev) => prev.slice(0, -1));
        setFilteredOption((prev) => [...prev, lastSelected]);
        setBackSpaceCount(2);
      }
    }
  }, [backspaceCount]);

  return (
    <div style={{
        marginTop: "80px",
        marginLeft: "80px",
        marginRight: "80px"
      }}>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            marginRight: "10px",
            border: "1px solid #ccc",
            padding: "5px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ width: "100%" }}>
            {selectedOptions &&
              selectedOptions.length > 0 &&
              selectedOptions.map((val, i) => (
                <span key={val} style={{ margin: "5px" }}>
                  <button
                    onClick={() => handleRemoveClick(val)}
                    onMouseEnter={() => setHoveredOption(val)}
                    onMouseLeave={() => setHoveredOption(null)}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        backspaceCount === 1 && i === selectedOptions.length - 1
                          ? "red"
                          : hoveredOption === val
                          ? "red"
                          : "",
                    }}
                  >
                    {val.name}&nbsp;&nbsp;
                    <strong
                      style={{
                        borderRadius: "20px",
                        backgroundColor: "red",
                        color: "white",
                      }}
                    >
                      {"X"}
                    </strong>
                  </button>
                </span>
              ))}
            <input
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Backspace" && searchStr === "") {
                  setBackSpaceCount(backspaceCount - 1);
                } else if (e.key === "Enter" && filteredOption.length > 0) {
                  handleAddClick(filteredOption[0]);
                }
              }}
              onChange={(e) => {
                setSearchStr(e.target.value);
              }}
              onClick={() => setIsHidden(!isHidden)}
              value={searchStr}
              style={{
                padding: "5px",
                width: "300px",
              }}
            />
          </div>
        </div>
        {!isHidden && (
          <div>
            {filteredOption &&
              filteredOption.length > 0 &&
              filteredOption
                .filter((option) =>
                  option.name.toLowerCase().includes(searchStr.toLowerCase())
                )
                .map((val) => (
                  <div key={val} style={{ margin: "5px" }}>
                    <button
                      onClick={() => handleAddClick(val)}
                      onMouseEnter={() => setHoveredOption(val)}
                      onMouseLeave={() => setHoveredOption(null)}
                      style={{
                        cursor: "pointer",
                        padding: "5px",
                        backgroundColor: hoveredOption === val ? "green" : "",
                      }}
                    >
                      <b>{val.name}</b>&nbsp;&nbsp;<b>{val.email}</b>
                      <strong
                        style={{
                          borderRadius: "20px",
                          backgroundColor: "green",
                          color: "white",
                        }}
                      >
                        {"+"}
                      </strong>
                    </button>
                  </div>
                ))}
            {noSearchRes && searchStr != "" && (
              <button>No Matching Records</button>
            )}
          </div>
        )}
      </div>
      <br />
    </div>
  );
}
