import React from "react";

export const OptionFilter = ({
  settingsOptions,
  resolutionOptions,
  setResolution,
  setSettings,
}) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
        }}
      >
        {resolutionOptions.length > 0 ? (
          <>
            {" "}
            <select
              onChange={(e) => {
                setResolution(e.currentTarget.value);
              }}
            >
              {resolutionOptions.map((o) => {
                return (
                  <option key={o} value={o}>
                    {o}
                  </option>
                );
              })}
            </select>
          </>
        ) : (
          <></>
        )}
        {settingsOptions.length > 0 ? (
          <select
            onChange={(e) => {
              setSettings(e.currentTarget.value);
            }}
          >
            {settingsOptions.map((o) => {
              return (
                <option key={o} value={o}>
                  {o}
                </option>
              );
            })}
          </select>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
