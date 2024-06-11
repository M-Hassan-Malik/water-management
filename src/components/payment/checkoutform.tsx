/* eslint-disable */

import { Flex } from "@chakra-ui/react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type { StripePaymentElementOptions } from "@stripe/stripe-js";
import type { Dispatch, MouseEvent, SetStateAction } from "react";
import React, { useEffect, useState } from "react";

import { Core } from "..";

interface ICheckoutFormProps {
  mutatePackage: () => void;
  setFail: Dispatch<SetStateAction<IAlertSuccessData | undefined>>;
}

export default function CheckoutForm({
  setFail,
  mutatePackage,
}: ICheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
    }
  }, [stripe]);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "",
      },
      redirect: "if_required",
    });

    if (error) {
      setFail({
        status: true,
        title: "Failed",
        description: String(error?.message),
      });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      mutatePackage();
    }
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form
      id="payment-form"
      style={{
        width: "100%",
        minWidth: "500px",
        alignSelf: "center",
      }}
    >
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <Flex columnGap={"10px"} justifyContent="end">
        <Core.Button
          btnOrangeMd
          type="submit"
          onClick={handleSubmit}
          isLoading={isLoading}
          isDisabled={isLoading || !stripe || !elements}
        >
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </Core.Button>
      </Flex>
    </form>
  );
}
