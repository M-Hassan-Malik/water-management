/* eslint-disable prettier/prettier */
import type { InputProps } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useMergeRefs,
} from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import React, { forwardRef, useContext, useRef } from "react";

import { InputsContext } from "@/pages/_app";

import { Icons } from "../icons";
import withSecureKey from "./hoc/withSecureKey";

const FieldComponent = React.memo(
  forwardRef<HTMLInputElement, InputProps & IField>(
    (
      {
        placeHolder,
        title,
        slug,
        key,
        formName,
        secure,
        supportSecure,
        toggleSecure,
        ...props
      },
      ref
    ) => {

      const inputRef = useRef<HTMLInputElement>(null);
      const contextData: any = useContext(InputsContext);
      const mergeRef = useMergeRefs(inputRef, ref);
      const singInHandler = (value: string) => {
        if (slug === "email")
          contextData.setInputs({ ...contextData.inputs, email: value });
        if (slug === "password")
          contextData.setInputs({ ...contextData.inputs, password: value });
      };
      const forgetPasswordHandler = (value: string) => {
        if (slug === "email")
          contextData.setInputs({ ...contextData.inputs, email: value });
      };
      const validateOTPHandler = (value: string) => {
        if (slug === "new_password")
          contextData.setInputs({ ...contextData.inputs, password: value });
        if (slug === "confirm_password")
          contextData.setInputs({
            ...contextData.inputs,
            confirmPassword: value,
          });
      };

      const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value, name } = e.target;
        switch (name) {
          case "sign_in":
            singInHandler(value);
            break;
          case "forgot_password":
            forgetPasswordHandler(value);
            break;
          case "new_password":
            validateOTPHandler(value);
            break;
          default:
            break;
        }
      };


      return (
        <FormControl mt={2} mb={2}>
          <FormLabel htmlFor={key}>{title}</FormLabel>
          <InputGroup>
            {supportSecure && (
              <InputRightElement>
                <IconButton
                  variant="link"
                  aria-label={secure ? "Mask password" : "Reveal password"}
                  icon={secure ? <Icons.HiEyeOff /> : <Icons.HiEye />}
                  onClick={toggleSecure}
                />
              </InputRightElement>
            )}
            <Input
              id={key}
              ref={mergeRef}
              name={formName}
              type={!secure ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder={placeHolder}
              {...props}
              onChange={(e) => changeHandler(e)}
            />
          </InputGroup>
        </FormControl>
      );
    }
  )
);

FieldComponent.displayName = "Field";

export const Field = withSecureKey(FieldComponent);
