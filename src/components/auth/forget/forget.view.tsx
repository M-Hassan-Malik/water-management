import { Box, Center, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { AuthComponents, Containers, Core, Misc } from "@/components";
import { getPageFormConfiguration } from "@/utils/helpers/form";

interface IQuotes {
  quote: string;
  author: string;
}
const quotes: IQuotes[] = [
  {
    quote:
      "If you want to go fast, go alone. If you want to go far, go together.",
    author: "African Proverb",
  },
  {
    quote: "Your most important work is always ahead of you, never behind you.",
    author: "Stephen Covey",
  },

  {
    quote: "There are no shortcuts to any place worth going.",
    author: "Beverly Sills",
  },
  {
    quote:
      "We are what we repeatedly do. Excellence, therefore, is not an act but a habit.",
    author: "Aristotle",
  },

  {
    quote: "A boat doesn’t go forward if each one is rowing their own way.",
    author: "Proverb",
  },

  {
    quote:
      "Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless.",
    author: "Jamie Paolinetti",
  },
  {
    quote:
      "Perfection is not attainable, but if we chase perfection, we can catch excellence.",
    author: "Vince Lombardi",
  },

  {
    quote:
      "The difference between ordinary and extraordinary is that little extra.",
    author: "Jimmy Johnson",
  },

  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },

  {
    quote:
      "If everyone is moving forward together, then success takes care of itself.",
    author: "Henry Ford",
  },

  {
    quote: "Whatever the mind of man can conceive and believe, it can achieve.",
    author: "Napoleon Hill",
  },

  {
    quote:
      "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
  },
  {
    quote: "Goodness and hard work are rewarded with respect.",
    author: "Luther Campbell",
  },

  {
    quote:
      "Start by doing what’s necessary, then what’s possible; and suddenly you are doing the impossible.",
    author: "St. Francis of Assisi",
  },

  {
    quote:
      "The man who has confidence in himself gains the confidence of others.",
    author: "Hasidic Proverb",
  },

  {
    quote:
      "Talent wins games, but teamwork and intelligence win championships.",
    author: "Michael Jordan",
  },

  {
    quote:
      "Culture is about performance, and making people feel good about how they contribute to the whole.",
    author: "Tracy Streckenbach",
  },

  {
    quote: "The secret of getting ahead is getting started.",

    author: "Mark Twain",
  },

  {
    quote:
      "It doesn’t take strength to win. It takes the true heart of the team to win.",

    author: "Emily Voyles",
  },

  {
    quote:
      "It is not a question of how well each process works; the question is how well they all work together.",

    author: "Lloyd Dobens",
  },

  {
    quote:
      "Synergy — the bonus that is achieved when things work together harmoniously.",

    author: "Mark Twain",
  },

  {
    quote:
      "The nice thing about teamwork is that you always have others on your side.",

    author: "Margaret Carty",
  },
  {
    quote:
      "Try not to become a man of success but rather try to become a man of value.",
    author: "Albert Einstein",
  },
  {
    quote:
      "The real competitive advantage in any business is one word only, which is ‘people.’",
    author: " Komil Toume",
  },
];
const ForgotPasswordScreenView = () => {
  const conf = getPageFormConfiguration("FORGET_PASSWORD");
  const [quoteToShow, setQuoteToShow] = useState<IQuotes>();

  useEffect(() => {
    setQuoteToShow(quotes[Math.floor(Math.random() * 24) + 1] as IQuotes);
  }, []);

  return (
    <Containers.AuthContainer
      Header={
        <Stack spacing="6">
          <Center
            alignSelf={"center"}
            display={{ base: "block", sm: "block", md: "none" }}
          >
            <Misc.Logo />
          </Center>
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "lg" }}>{conf?.title}</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Enter your email to get OTP.</Text>
            </HStack>
          </Stack>
        </Stack>
      }
      Content={
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg-surface" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <Core.Form {...conf} />
            </Stack>
          </Stack>
        </Box>
      }
      SideContent={
        quoteToShow?.quote && (
          <AuthComponents.SideContentView
            // brands
            heading="Welcome to EllisDocs."
            subHeading={`Aquatic facility management, record keeping, and accountability.`}
            quote={`${quoteToShow?.quote}`}
            author={`– ${quoteToShow?.author}`}
          />
        )
      }
    />
  );
};

export default ForgotPasswordScreenView;
