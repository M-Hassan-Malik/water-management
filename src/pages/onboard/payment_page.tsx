import { Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useQuery } from "react-query";

import { Core } from "@/components";
import { HandleLogout } from "@/components/auth";
import { type InputRegisterClient } from "@/graphql/generated/graphql";
import { GetClientSecretForSubscriber } from "@/services/api";

import CheckoutForm from "../../components/payment/subscription_package/onboard_checkoutform";

interface IPaymentProps {
  payload: InputRegisterClient;
  cost: number;
  title: string;
}

// Initialize Stripe with specific options
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY as string, {
  betas: ["checkout_beta_4"],
});

const PaymentPage: React.FC<IPaymentProps> = ({ payload, title, cost }) => {
  const [success] = useState<IAlertSuccessData>();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const [clientSecret, setClientSecret] = useState("");

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  useQuery(
    "getPaymentIntentClientSecretForSubscriber",
    () =>
      GetClientSecretForSubscriber({
        amount: cost,
      }),
    {
      onSuccess({ getClientSecretForSubscriber }) {
        setClientSecret(
          getClientSecretForSubscriber.clientSecret
            ? getClientSecretForSubscriber.clientSecret
            : ""
        );
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        setFail({
          status: true,
          title: "Error",
          description: _?.response?.errors[0]?.message,
        });
        // if (!user.stripeCustomerId)
        //   createStripeCustomerMutate({ email: user.email });
      },
      refetchOnMount: true,
      enabled: Boolean(cost),
    }
  );

  return (
    <HStack
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      paddingX={"20px"}
      minHeight={"450px"}
    >
      <Core.Alert show={success} theme="success" />
      <Core.Alert show={fail} theme="error" />
      <Flex
        flexDirection={"row"}
        gap={"30px"}
        justifyContent={"start"}
        paddingTop={"5%"}
      >
        <Flex m="0" flexDirection={"column"}>
          <Heading as="h6" size="22" mb="3px">
            Package Name:
          </Heading>
          <Text
            fontSize="30px"
            color="blue.900"
            mt="3"
            py={"5px"}
            px={"20px"}
            bgColor={"#0000000a"}
            rounded={"10px"}
          >
            {title}
          </Text>
        </Flex>
        <Flex m="0" flexDirection={"column"}>
          <Heading as="h6" size="22" mb="3px">
            Payable Amount:
          </Heading>
          <Text
            fontSize="50px"
            color="orange.900"
            fontWeight={"bold"}
            fontFamily={"Poppins"}
          >
            $ {cost}
          </Text>
        </Flex>
      </Flex>
      <VStack alignItems={"center"} paddingTop={"7%"}>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm setFail={setFail} payload={payload} />
          </Elements>
        )}
      </VStack>
    </HStack>
  );
};

export default PaymentPage;
