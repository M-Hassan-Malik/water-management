/* eslint-disable */
import { NextApiRequest, NextApiResponse } from "next";
import { parseString } from "xml2js";

const AssertionConsumerEndpoint = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    // Extract SAMLResponse parameter from the query string
    const { SAMLResponse } = req.query;

    if (!SAMLResponse) {
      return res.status(400).json({ error: "SAMLResponse not found" });
    }

    // Handle SAML assertion here
    const decodedSAMLResponse = Buffer.from(
      SAMLResponse as string,
      "base64"
    ).toString("utf-8");

    // Parse the XML content
    parseString(decodedSAMLResponse, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error parsing SAML response XML" });
      }

      // Extract relevant information from the parsed XML
      const samlAttributes =
        result["samlp:Response"]["saml:Assertion"]["saml:AttributeStatement"][
          "saml:Attribute"
        ];

      // Extract the desired information (adjust as needed)
      const username = samlAttributes[0]["saml:AttributeValue"][0];

      // Perform additional processing as needed
      // ...

      // Optionally, respond with a success message
      return res.status(200).json({ success: true, username });
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default AssertionConsumerEndpoint;
