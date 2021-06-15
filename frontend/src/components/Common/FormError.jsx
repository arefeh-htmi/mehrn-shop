import React from "react";
import Message from "./Message";
export default function FormError(props) {
  console.log(props);
  return (
    <>
      {props.fieldNames.map((fn, i) => {
        if (props.errors[fn]) {
          return (
            <Message variant="danger">
              {props.errors[props.fieldNames[i]]}
            </Message>
          );
        } else {
          return null;
        }
      })}
    </>
  );
}
