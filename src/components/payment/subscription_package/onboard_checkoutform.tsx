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
import { Core } from "@/components";
import { useMutation } from "react-query";
import {
  InputRegisterClient,
  RegisterClientMutation,
} from "@/graphql/generated/graphql";
import {
  RegisterClient,
  ActivateSubAdminAfterSubscription,
} from "@/services/api";
import { verifyJWT } from "@/utils/helpers/jwt";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

interface ICheckoutFormProps {
  payload: InputRegisterClient;
  setFail: Dispatch<SetStateAction<IAlertSuccessData | undefined>>;
}

export default function CheckoutForm({ setFail, payload }: ICheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const { replace } = useRouter();
  const [, setAuthCookie] = useCookies(["auth"]);

  useEffect(() => {
    if (!stripe) {
      // Handle the case where Stripe is not yet initialized
    }
  }, [stripe]);

  const { mutate: activateSubAdminMutation } = useMutation(
    ActivateSubAdminAfterSubscription,
    {
      onSuccess: async ({ activateSubAdminAfterSubscription: token }) => {
        setIsLoading(false);

        const verified = verifyJWT(token);
        if (verified) {
          setAuthCookie("auth", token, {
            path: "/",
            maxAge: 60 * 30, // 30 minutes in seconds
          });
        }

        replace("/dashboard");
      },
      onError: (_: any) => {
        setFail({
          status: true,
          title: "Success",
          description: `User Created Successfully but, ${_?.response?.errors[0]?.message}. Please Contact Support/Administration Team`,
        });
        setIsLoading(false);
        replace("/dashboard");
      },
    }
  );

  const { mutate } = useMutation<
    RegisterClientMutation,
    unknown,
    InputRegisterClient
  >((variables) => RegisterClient({ registerClientInput: variables }), {
    onSuccess: async ({ registerClient: user_id }) => {
      if (!stripe || !elements) {
        return;
      }
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
          description: String(error.message),
        });

        setIsLoading(false);
      } else {
        activateSubAdminMutation({ userId: user_id });
      }
    },
    onError: (_: any) => {
      setFail({
        status: true,
        title: "Failed",
        description: _?.response?.errors[0]?.message,
      });
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      if (!stripe || !elements) {
        return;
      }
      mutate({
        ...payload,
      });
    } catch (error) {
      // Handle unexpected errors
      setFail({
        status: true,
        title: "Failed",
        description: "An unexpected error occurred during payment.",
      });
      setIsLoading(false);
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
