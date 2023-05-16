import React, { CSSProperties, ReactNode } from "react";
import { useNavigation } from "react-router-dom";
import { MoonLoader } from "react-spinners";

export const Loader = ({
  children,
}: {
  children: undefined | any | undefined;
}) => {
  const override: CSSProperties = {
    display: "block",
    margin: "30% auto",
  };
  const navigation = useNavigation();

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          boxSizing: "border-box",
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(20,20,20,.8)",
          display: navigation.state == "loading" ? "flex" : "none",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {navigation.state == "loading" ? (
          <MoonLoader
            color={"white"}
            loading={navigation.state == "loading"}
            cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : undefined}
      </div>
      <>{children}</>
    </>
  );
};
