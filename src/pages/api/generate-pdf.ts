import htmlToPdf from "html-pdf";
import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Function to convert HTML to PDF using html-pdf package
    const htmlToPdfConverter = (html: string) => {
      return new Promise<Buffer>((resolve, reject) => {
        htmlToPdf.create(html).toBuffer((err, buffer) => {
          if (err) reject(err);
          else resolve(buffer);
        });
      });
    };

    // Get the HTML content that needs to be converted to PDF from request body
    const { htmlContent }: { htmlContent: string } = req.body;

    if (!htmlContent) {
      return res.status(400).json({ error: "HTML content not provided" });
    }

    // Check if the HTML content exceeds a certain length
    const isLongHtml = htmlContent.length > 2000; // You can adjust this threshold

    if (isLongHtml) {
      // If HTML content is lengthy, use Puppeteer to generate multi-page PDF
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(htmlContent);
      const pdfBuffer = await page.pdf({ format: "A4" });
      await browser.close();

      // Send generated PDF as response
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="multi_page.pdf"'
      );
      return res.status(200).send(pdfBuffer);
    }
    // If HTML content is short, use html-pdf package to generate single-page PDF
    const pdfBuffer = await htmlToPdfConverter(htmlContent);

    // Send generated PDF as response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="single_page.pdf"'
    );
    return res.status(200).send(pdfBuffer);
  } catch (error) {
    return res.status(500).json({ error: "Error generating PDF" });
  }
};

export default handler;
