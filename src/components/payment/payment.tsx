import { Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

import { HandleLogout } from "@/components/auth";
import type { FindPackageByIdQuery } from "@/graphql/generated/graphql";
import {
  CreateStripeCustomer,
  FindPackageById,
  GetClientSecret,
  ModifyPackage,
} from "@/services/api";

import { Core } from "..";
import CheckoutForm from "./checkoutform";

interface IPaymentProps {}

// Initialize Stripe with specific options
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY as string, {
  betas: ["checkout_beta_4"],
});

const Payment: React.FC<IPaymentProps> = () => {
  const { query, reload } = useRouter();
  const [success, setSuccess] = useState<IAlertSuccessData>();
  const [fail, setFail] = useState<IAlertSuccessData>();
  const user: IUser = useSelector((state: any) => state.user.user);
  const [clientSecret, setClientSecret] = useState("");
  const [selectedPackage, setSelectedPackage] =
    useState<FindPackageByIdQuery["findPackageById"]>();

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  const { mutate: userPackageMutate } = useMutation(ModifyPackage, {
    onSuccess: () => {
      setSuccess({
        status: true,
        title: "Updated",
        description: "Package has been updated successfully.",
      });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    },
    onError: (_: any) => {
      setFail({
        status: true,
        title: "Failed",
        description: _?.response?.errors[0]?.message,
      });
    },
  });

  const { mutate: createStripeCustomerMutate } = useMutation(
    CreateStripeCustomer,
    {
      onSuccess: ({ createStripeCustomer }) => {
        setSuccess({
          status: true,
          title: "Success",
          description: createStripeCustomer.message || "",
        });
        reload();
      },
      onError: (_: any) => {
        setFail({
          status: true,
          title: "Failed",
          description: _?.response?.errors[0]?.message,
        });
      },
    }
  );

  useQuery(
    "findAllSubPackages",
    () => FindPackageById({ packageId: String(query.id) }),
    {
      onSuccess(data) {
        if (data?.findPackageById) {
          setSelectedPackage(data?.findPackageById);
        }
      },
      onError(_: any) {
        if (
          _?.response?.errors?.length &&
          _?.response?.errors[0]?.message === "Not Authorised!"
        )
          HandleLogout();
        setFail({
          status: true,
          title: "Failed",
          description: "Failed to fetch package",
        });
      },
      refetchOnMount: true,
    }
  );

  useQuery(
    "getPaymentIntentClientSecret",
    () =>
      GetClientSecret({
        input: {
          amount: Number(query.amount),
          customerId: user.stripeCustomerId,
        },
      }),
    {
      onSuccess({ getClientSecret }) {
        setClientSecret(
          getClientSecret.clientSecret ? getClientSecret.clientSecret : ""
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
        if (!user.stripeCustomerId)
          createStripeCustomerMutate({ email: user.email });
      },
      refetchOnMount: true,
      enabled: Boolean(query.amount),
    }
  );

  const mutatePackage = () => {
    if (user._id) {
      userPackageMutate({
        userPackageModifyInput: {
          _id:
            selectedPackage && selectedPackage._id ? selectedPackage._id : "",
          user_id: user._id,
          status: String(query.status),
          paymentDetails: {
            method: "CARD",
            amount: selectedPackage?.cost || 0,
          },
        },
      });
    } else
      setFail({
        status: true,
        title: "Error",
        description: `Unable to find user, please reload the page`,
      });
  };

  return (
    <HStack
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      paddingX={"20px"}
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
          <Text fontSize="30px" color="blue.900">
            {selectedPackage?.title}
          </Text>
        </Flex>
        <Flex m="0" flexDirection={"column"}>
          <Heading as="h6" size="22" mb="3px">
            Payable Amount:
          </Heading>
          <Text fontSize="50px" color="orange.900" fontWeight={"bold"}>
            $ {selectedPackage?.cost}
          </Text>
        </Flex>
      </Flex>
      <VStack alignItems={"center"} paddingTop={"10%"}>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm setFail={setFail} mutatePackage={mutatePackage} />
          </Elements>
        )}
      </VStack>
    </HStack>
  );
};

export default Payment;
