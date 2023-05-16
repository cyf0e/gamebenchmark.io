import React from "react";

export const GraphBar = ({
  title,
  value,
  maxValue,
  color,
}: {
  title: string;
  value: number;
  maxValue: number;
  color: string;
}) => {
  return (
    <>
      {value > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ display: "inline-block", width: "10%" }}>{title}</span>
          <div style={{ width: "85%" }}>
            <div style={{ width: "90%", display: "inline-block" }}>
              <div
                style={{
                  width: `${(value / maxValue) * 90}%`,
                  height: "10px",
                  backgroundColor: color,
                  display: "inline-block",
                  borderRadius: "20px",
                  boxShadow:"1px 1px 2px rgba(0,0,0,.6)"
                }}
              ></div>
              <span style={{ display: "inline-block", margin: "0 5px" }}>
                {value}
              </span>
            </div>
          </div>
        </div>
      ) : undefined}
    </>
  );
};
