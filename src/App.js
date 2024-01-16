import React, { useState } from "react";
import ContentSelect from "./ContentSelect";

export default function App() {
  const [data, setData] = useState([
    { name: "John Doe", email: "john.doe@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Bob Johnson", email: "bob.johnson@example.com" },
    { name: "Alice Williams", email: "alice.williams@example.com" },
    { name: "David Brown", email: "david.brown@example.com" },
    { name: "Emily Davis", email: "emily.davis@example.com" },
    { name: "Michael Miller", email: "michael.miller@example.com" },
    { name: "Sarah Wilson", email: "sarah.wilson@example.com" },
    { name: "Christopher Taylor", email: "christopher.taylor@example.com" },
    { name: "Olivia Moore", email: "olivia.moore@example.com" },
    { name: "Daniel Lee", email: "daniel.lee@example.com" },
    { name: "Eva Robinson", email: "eva.robinson@example.com" },
  ]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <div className="App">
      <ContentSelect
        allOptions={data}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </div>
  );
}
